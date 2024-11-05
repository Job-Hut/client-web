import { gql } from "@apollo/client";

export const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($avatar: Upload!) {
    updateAvatar(avatar: $avatar) {
      _id
    }
  }
`;
