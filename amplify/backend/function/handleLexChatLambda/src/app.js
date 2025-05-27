import {
  LexRuntimeV2Client,
  RecognizeTextCommand
} from "@aws-sdk/client-lex-runtime-v2";
import {
  DynamoDBClient,
  PutItemCommand
} from "@aws-sdk/client-dynamodb";
import {
  EC2Client,
  RunInstancesCommand,
  DescribeInstancesCommand
} from "@aws-sdk/client-ec2";
import {
  S3Client,
  ListBucketsCommand
} from "@aws-sdk/client-s3";

const lex = new LexRuntimeV2Client({ region: "us-east-1" });
const db = new DynamoDBClient({ region: "us-east-1" });
const ec2 = new EC2Client({ region: "us-east-1" });
const s3 = new S3Client({ region: "us-east-1" });

const BOT_ID = "DD47GHPD6E";        
const BOT_ALIAS_ID = "TSTALIASID";  
const LOCALE = "en_US";
const DDB_TABLE = "ChatMessages";

export const handler = async (event) => {
  const sessionId = event.sessionId || `user-${Date.now()}`;
  const userMessage = event.input || "No message";
  console.log("Received user message:", userMessage);

  try {
    const lexResponse = await lex.send(
      new RecognizeTextCommand({
        botId: BOT_ID,
        botAliasId: BOT_ALIAS_ID,
        localeId: LOCALE,
        sessionId: sessionId,
        text: userMessage
      })
    );

    console.log(" Raw Lex response:", JSON.stringify(lexResponse, null, 2));

    const intentName = lexResponse.sessionState?.intent?.name || "UnknownIntent";
    const slots = lexResponse.sessionState?.intent?.slots || {};

    let botReply = "";

    if (intentName === "ListEC2Instances") {
      const result = await ec2.send(new DescribeInstancesCommand({}));
      const instances = result.Reservations?.flatMap(r =>
        r.Instances?.map(i => i.InstanceId)
      ) || [];
      botReply = `You have ${instances.length} EC2 instance(s): ${instances.join(', ') || 'None'}`;
    }

    else if (intentName === "DescribeS3Intentt") {
      const result = await s3.send(new ListBucketsCommand({}));
      const buckets = result.Buckets?.map(b => b.Name) || [];
      botReply = `You have ${buckets.length} S3 bucket(s): ${buckets.join(', ') || 'None'}`;
    }

    else if (intentName === "CreateEC2InstanceIntent") {
      const instanceType = slots.instanceType?.value?.interpretedValue || "t2.micro";
      const osType = slots.osType?.value?.interpretedValue || "Linux";

      const amiMap = {
        Linux: "ami-0c02fb55956c7d316",
        Windows: "ami-03f65b8614a860c29",
        Mac: "ami-09b9050f4ab0bdbfa"
      };

      if (osType === "Mac" && instanceType !== "mac2.metal") {
        botReply = " For macOS, you must use instance type: mac2.metal";
      } else {
        const command = new RunInstancesCommand({
          ImageId: amiMap[osType],
          InstanceType: instanceType,
          MinCount: 1,
          MaxCount: 1
        });

        const result = await ec2.send(command);
        const instanceId = result.Instances?.[0]?.InstanceId;
        botReply = ` EC2 ${osType} instance created! ID: ${instanceId}`;
      }
    }

    else {
      botReply = " Sorry, I couldn't understand your request.";
    }

    await db.send(
      new PutItemCommand({
        TableName: DDB_TABLE,
        Item: {
          id: { S: Date.now().toString() },
          userMessage: { S: userMessage },
          botReply: { S: botReply },
          intentName: { S: intentName },
          timestamp: { S: new Date().toISOString() }
        }
      })
    );

    console.log("Message logged in DynamoDB");
    console.log("FINAL RETURN", { userMessage, botReply });

    return {
      userMessage,
      botReply
    };
  } catch (error) {
    console.error(" Lambda error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        userMessage,
        botReply: "An error occurred while processing your request.",
        error: error.message || "No error message"
      }),
    };
  }
};
