/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChatMessages = /* GraphQL */ `
  mutation CreateChatMessages(
    $input: CreateChatMessagesInput!
    $condition: ModelChatMessagesConditionInput
  ) {
    createChatMessages(input: $input, condition: $condition) {
      id
      user
      message
      response
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChatMessages = /* GraphQL */ `
  mutation UpdateChatMessages(
    $input: UpdateChatMessagesInput!
    $condition: ModelChatMessagesConditionInput
  ) {
    updateChatMessages(input: $input, condition: $condition) {
      id
      user
      message
      response
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChatMessages = /* GraphQL */ `
  mutation DeleteChatMessages(
    $input: DeleteChatMessagesInput!
    $condition: ModelChatMessagesConditionInput
  ) {
    deleteChatMessages(input: $input, condition: $condition) {
      id
      user
      message
      response
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
