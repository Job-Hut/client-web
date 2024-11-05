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
