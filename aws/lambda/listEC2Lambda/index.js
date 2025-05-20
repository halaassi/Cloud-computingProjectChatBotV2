const { EC2Client, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");

const client = new EC2Client({ region: "us-east-1" });

exports.handler = async (event) => {
  try {
    const command = new DescribeInstancesCommand({});
    const response = await client.send(command);

    const instances = response.Reservations?.flatMap(
      r => r.Instances?.map(i => i.InstanceId)
    ) || [];

    const reply = `You have ${instances.length} EC2 instance(s): ${instances.join(', ') || 'None'}`;
    return {
      sessionState: {
        dialogAction: { type: "Close" },
        intent: {
          name: "ListEC2Instances", 
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
    console.error("Lambda error:", error);

    return {
      sessionState: {
        dialogAction: { type: "Close" },
        intent: {
          name: "ListEC2InstancesIntent",
          state: "Failed"
        }
      },
      messages: [
        {
          contentType: "PlainText",
          content: "Something went wrong while fetching EC2 instances."
        }
      ]
    };
  }
};


