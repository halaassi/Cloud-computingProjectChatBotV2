exports.handler = async (event) => {
  console.log("AdminQueries Lambda triggered:", JSON.stringify(event));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from AdminQueries Lambda!",
      input: event
    })
  };
};