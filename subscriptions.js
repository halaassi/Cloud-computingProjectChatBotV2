/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChatMessages = /* GraphQL */ `
  subscription OnCreateChatMessages(
    $filter: ModelSubscriptionChatMessagesFilterInput
  ) {
    onCreateChatMessages(filter: $filter) {
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
export const onUpdateChatMessages = /* GraphQL */ `
  subscription OnUpdateChatMessages(
    $filter: ModelSubscriptionChatMessagesFilterInput
  ) {
    onUpdateChatMessages(filter: $filter) {
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
export const onDeleteChatMessages = /* GraphQL */ `
  subscription OnDeleteChatMessages(
    $filter: ModelSubscriptionChatMessagesFilterInput
  ) {
    onDeleteChatMessages(filter: $filter) {
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
