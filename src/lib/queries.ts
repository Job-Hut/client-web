import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    getAuthenticatedUser {
      _id
      username
      avatar
      fullName
      email
      profile {
        _id
        bio
        location
        createdAt
        updatedAt
        jobPrefs
        experiences {
          _id
          jobTitle
          institute
          startDate
          endDate
        }
        education {
          _id
          name
          institute
          startDate
          endDate
        }
        licenses {
          _id
          number
          name
          issuedBy
          issuedAt
          expiryDate
        }
      }
      collections {
        _id
        name
      }
      isOnline
      createdAt
      updatedAt
    }
  }
`;

export const GET_APPLICATIONS = gql`
  query GetAllApplication {
    getAllApplication {
      _id
      ownerId
      collectionId
      jobTitle
      description
      organizationName
      organizationAddress
      organizationLogo
      location
      salary
      type
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
`;

export const GET_JOBS = gql`
  query GetJobs($page: Int!, $query: String!) {
    getJobs(page: $page, query: $query) {
      title
      company
      companyLogo
      location
      description
      salary
      source
      sourceUrl
      since
    }
  }
`;

export const GET_COLLECTION_DETAIL = gql`
  query GetCollectionById($id: ID!) {
    getCollectionById(id: $id) {
      _id
      name
      description
      ownerId {
        _id
        avatar
        username
        isOnline
      }
      sharedWith {
        _id
        avatar
        username
        isOnline
      }
      applications {
        _id
        ownerId
        collectionId
        jobTitle
        description
        organizationName
        organizationAddress
      }
      createdAt
      updatedAt
      chat {
        content
        createdAt
        updatedAt
        senderId {
          username
          avatar
          fullName
          isOnline
          createdAt
          updatedAt
          _id
        }
        _id
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetUsers {
    getAllUsers {
      _id
      username
      avatar
      fullName
      email
      createdAt
      updatedAt
      isOnline
      collections {
        _id
      }
    }
  }
`;
