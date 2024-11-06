import Navbar from "@/components/ui/Navbar";
import UserCard from "@/components/ui/UserCard";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { User } from "@/lib/types";

const GET_COLLECTION_BY_ID = gql`
  query Query($getCollectionByIdId: ID!) {
    getCollectionById(id: $getCollectionByIdId) {
      _id
      name
      description
      sharedWith {
        _id
        avatar
        username
        isOnline
      }
    }
  }
`;

const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    getAuthenticatedUser {
      _id
      avatar
      username
      isOnline
    }
  }
`;

export default function ViewMembers() {
  const { getCollectionByIdId } = useParams();
  const navigate = useNavigate();

  const { data: collectionData } = useQuery(GET_COLLECTION_BY_ID, {
    variables: { getCollectionByIdId },
  });

  const { data: authData } = useQuery(GET_AUTHENTICATED_USER);

  let members = collectionData?.getCollectionById?.sharedWith || [];
  const authenticatedUser = authData?.getAuthenticatedUser;

  if (authenticatedUser && !members.some((user: User) => user._id === authenticatedUser._id)) {
    members = [authenticatedUser, ...members];
  }

  const sortedMembers = members.sort((a: User, b: User) => Number(b.isOnline) - Number(a.isOnline));

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-secondary">
      {/* Navbar */}
      <Navbar />
      <div className="mt-10 md:mt-40 w-11/12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:w-8/12 xl:grid-cols-4">
        {sortedMembers.map((user: User) => (
          <UserCard
            key={user._id}
            user={{
              ...user,
              isInvited: true,
            }}
          />
        ))}
      </div>
    </div>
  );
}
