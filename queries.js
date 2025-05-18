/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChatMessages = /* GraphQL */ `
  query GetChatMessages($id: ID!) {
    getChatMessages(id: $id) {
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
export const listChatMessages = /* GraphQL */ `
  query ListChatMessages(
    $filter: ModelChatMessagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        message
        response
        timestamp
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
