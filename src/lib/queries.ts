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
