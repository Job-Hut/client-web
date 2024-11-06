import { gql } from "@apollo/client";

export const SUBSCRIBE_USER_PRESENCE = gql`
  subscription UserPresence {
    userPresence {
      _id
      username
      avatar
      fullName
      email
      password
      isOnline
      createdAt
      updatedAt
    }
  }
`;

export const SUBSCRIBE_COLLECTION_USER = gql`
  subscription CollectionUserPresence($collectionId: ID!) {
    collectionUserPresence(collectionId: $collectionId) {
      _id
      username
      avatar
      fullName
      email
      password
      isOnline
      createdAt
      updatedAt
    }
  }
`;
