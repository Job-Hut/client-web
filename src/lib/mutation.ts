import { gql } from "@apollo/client";

export const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($avatar: Upload!) {
    updateAvatar(avatar: $avatar) {
      _id
    }
  }
`;

export const UPDATE_BIO = gql`
  mutation UpdateBio($bio: String!) {
    updateBio(bio: $bio) {
      bio
    }
  }
`;

export const UPDATE_LOCATION = gql`
  mutation UpdateLocation($location: String!) {
    updateLocation(location: $location) {
      location
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $fullName: String!
    $username: String!
    $location: String!
    $bio: String!
  ) {
    updateProfile(
      fullName: $fullName
      username: $username
      location: $location
      bio: $bio
    ) {
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

export const ADD_EXPERIENCE = gql`
  mutation AddExperience($input: ExperienceInput) {
    addExperience(input: $input) {
      experiences {
        _id
        jobTitle
        institute
        startDate
        endDate
      }
    }
  }
`;

export const ADD_EDUCATION = gql`
  mutation AddEducation($input: EducationInput) {
    addEducation(input: $input) {
      education {
        _id
        name
        institute
        startDate
        endDate
      }
    }
  }
`;

export const ADD_LICENSE = gql`
  mutation AddLicense($input: LicenseInput) {
    addLicense(input: $input) {
      licenses {
        _id
        number
        name
        issuedBy
        issuedAt
        expiryDate
      }
    }
  }
`;

export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($experienceId: String!, $input: ExperienceInput) {
    updateExperience(experienceId: $experienceId, input: $input) {
      experiences {
        _id
        jobTitle
        institute
        startDate
        endDate
      }
    }
  }
`;

export const DELETE_EXPERIENCE = gql`
  mutation AddExperience($experienceId: String!) {
    deleteExperience(experienceId: $experienceId) {
      experiences {
        _id
        jobTitle
        institute
        startDate
        endDate
      }
    }
  }
`;

export const UPDATE_EDUCATION = gql`
  mutation UpdateEducation($educationId: String!, $input: EducationInput) {
    updateEducation(educationId: $educationId, input: $input) {
      education {
        _id
        name
        institute
        startDate
        endDate
      }
    }
  }
`;

export const DELETE_EDUCATION = gql`
  mutation DeleteEducation($educationId: String!) {
    deleteEducation(educationId: $educationId) {
      education {
        _id
        name
        institute
        startDate
        endDate
      }
    }
  }
`;

export const UPDATE_LICENSE = gql`
  mutation UpdateLicense($licenseId: String!, $input: LicenseInput) {
    updateLicense(licenseId: $licenseId, input: $input) {
      licenses {
        _id
        number
        name
        issuedBy
        issuedAt
        expiryDate
      }
    }
  }
`;

export const DELETE_LICENSE = gql`
  mutation DeleteLicense($licenseId: String!) {
    deleteLicense(licenseId: $licenseId) {
      licenses {
        _id
        number
        name
        issuedBy
        issuedAt
        expiryDate
      }
    }
  }
`;
