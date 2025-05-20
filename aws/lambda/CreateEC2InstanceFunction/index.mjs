import { EC2Client, RunInstancesCommand } from "@aws-sdk/client-ec2";

const ec2 = new EC2Client({ region: "us-east-1" });

export const handler = async (event) => {
  const slots = event?.sessionState?.intent?.slots;
  const instanceType = slots?.instanceType?.value?.interpretedValue || "t2.micro";
  const osType = slots?.osType?.value?.interpretedValue || "Linux";

  const amiMap = {
    Linux: "ami-0c02fb55956c7d316",       
    Windows: "ami-03f65b8614a860c29",     
    Mac: "ami-09b9050f4ab0bdbfa"          
  };

 
  const macRequiredType = "mac2.metal";

  try {
    if (osType === "Mac" && instanceType !== macRequiredType) {
      return {
        sessionState: {
          dialogAction: { type: "Close" },
          intent: { name: "CreateEC2InstanceIntent", state: "Failed" }
        },
        messages: [
          {
            contentType: "PlainText",
            content: `❌ For macOS, you must use instance type: ${macRequiredType}`
          }
        ]
      };
    }

    const amiId = amiMap[osType];
    if (!amiId) throw new Error("Unsupported OS type");

    const command = new RunInstancesCommand({
      ImageId: amiId,
      InstanceType: instanceType,
      MinCount: 1,
      MaxCount: 1,
    });

    const result = await ec2.send(command);
    const instanceId = result.Instances?.[0]?.InstanceId;

    return {
      sessionState: {
        dialogAction: { type: "Close" },
        intent: { name: "CreateEC2InstanceIntent", state: "Fulfilled" }
      },
      messages: [
        {
          contentType: "PlainText",
          content: `✅ EC2 instance created! ID: ${instanceId}`
        }
      ]
    };
  } catch (error) {
    return {
      sessionState: {
        dialogAction: { type: "Close" },
        intent: { name: "CreateEC2InstanceIntent", state: "Failed" }
      },
      messages: [
        {
          contentType: "PlainText",
          content: `❌ Failed to create EC2: ${error.message}`
        }
      ]
    };
  }
};
