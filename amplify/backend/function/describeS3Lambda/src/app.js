const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");

const client = new S3Client({ region: "us-east-1" });

exports.handler = async (event) => {
  try {
    const response = await client.send(new ListBucketsCommand({}));
    const bucketNames = response.Buckets?.map(b => b.Name) || [];

    const reply = `You have ${bucketNames.length} S3 bucket(s): ${bucketNames.join(', ') || 'None'}`;

    return {
      sessionState: {
        dialogAction: { type: "Close" },
        intent: {
          name: "DescribeS3Intentt", 
          state: "Fulfilled"
        }
      },
      messages: [
        {
          contentType: "PlainText",
          content: reply
        }
      ]
    };
  } catch (error) {
    console.error("❌ describeS3Lambda error:", error);

    return {
      sessionState: {
        dialogAction: { type: "Close" },
        intent: {
          name: "DescribeS3Intentt",
          state: "Failed"
        }
      },
      messages: [
        {
          contentType: "PlainText",
          content: "Failed to retrieve your S3 buckets."
        }
      ]
    };
  }
};

