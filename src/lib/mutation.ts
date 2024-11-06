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
    $jobPrefs: [String]
  ) {
    updateProfile(
      fullName: $fullName
      username: $username
      location: $location
      bio: $bio
      jobPrefs: $jobPrefs
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

export const ADD_APPLICATIONS_TO_COLLECTION = gql`
  mutation AddApplicationsToCollection(
    $collectionId: ID!
    $applicationIds: [ID!]!
  ) {
    addApplicationsToCollection(
      collectionId: $collectionId
      applicationIds: $applicationIds
    ) {
      _id
      name
      applications {
        _id
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
  }
`;

export const INVITE_USER_TO_COLLECTION = gql`
  mutation AddUsersToCollection($collectionId: ID!, $userIds: [ID!]!) {
    addUsersToCollection(collectionId: $collectionId, userIds: $userIds) {
      _id
    }
  }
`;

export const GENERATE_TASKS_WITH_AI = gql`
  mutation GetTasksGeneratedByAi($id: ID!) {
    getTasksGeneratedByAi(_id: $id) {
      title
      description
      dueDate
      createdAt
      updatedAt
      completed
    }
  }
`;

export const REMOVE_TASK_WITH_APPLICATION = gql`
  mutation RemoveTaskFromApplication($applicationId: ID!, $taskId: ID!) {
    removeTaskFromApplication(applicationId: $applicationId, taskId: $taskId) {
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
      tasks {
        _id
        title
        description
        completed
        dueDate
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTaskInApplication(
    $applicationId: ID!
    $taskId: ID!
    $input: TaskInput
  ) {
    updateTaskInApplication(
      applicationId: $applicationId
      taskId: $taskId
      task: $input
    ) {
      _id
      tasks {
        _id
        title
        description
        completed
        dueDate
        createdAt
        updatedAt
      }
    }
  }
`;
