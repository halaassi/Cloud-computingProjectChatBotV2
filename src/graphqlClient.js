// src/graphqlClient.js
import { GraphQLClient } from 'graphql-request';
import awsExports from './aws-exports';
import { fetchAuthSession } from '@aws-amplify/auth';

export const getClient = async () => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();

  return new GraphQLClient(awsExports.aws_appsync_graphqlEndpoint, {
    headers: {
      Authorization: token,
    },
  });
};
