import CollectionDetailCard from "@/components/ui/CollectionDetailCard";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useSubscription } from "@apollo/client";
import { Application, User } from "@/lib/types";
import Navbar from "@/components/ui/Navbar";
import BottomNavigation from "@/components/ui/BottomNavigation";
import { Edit3 } from "lucide-react";
import { GET_COLLECTION_DETAIL } from "@/lib/queries";
import { useEffect, useState } from "react";
import { SUBSCRIBE_USER_PRESENCE } from "@/lib/subscription";

export default function CollectionDetail() {
  const { _id } = useParams();

  const [members, setMembers] = useState<User[]>([]);

  const { data, loading, error } = useQuery(GET_COLLECTION_DETAIL, {
    variables: { id: _id },
    fetchPolicy: "no-cache",
  });

  const { data: userOnline } = useSubscription(SUBSCRIBE_USER_PRESENCE, {
    variables: { collectionId: _id },
  });

  useEffect(() => {
    if (data) {
      if (data?.getCollectionById?.sharedWith) {
        setMembers([
          // eslint-disable-next-line no-unsafe-optional-chaining
          ...data?.getCollectionById?.sharedWith,
          data?.getCollectionById?.ownerId,
        ]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (userOnline) {
      setMembers((prev) => {
        return prev.map((member) => {
          if (member._id === userOnline.userPresence._id) {
            return {
              ...member,
              isOnline: userOnline.userPresence.isOnline,
            };
          }
          return member;
        });
      });

      console.log(userOnline);
    }
  }, [userOnline]);

  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-secondary">
      {/* Navbar */}
      <Navbar />

      {/* Navbar for smaller screen */}
      <div className="font-poppins fixed left-0 right-0 top-0 z-[100] flex items-center justify-between bg-primary p-4 text-background shadow-md md:hidden">
        <button
          className="text-lg"
          aria-label="Go back"
          onClick={() => navigate("/collections")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-arrow-left"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 12H8" />
            <path d="m12 8-4 4 4 4" />
          </svg>
        </button>

        <h2 className="absolute left-1/2 -translate-x-1/2 transform text-base font-semibold sm:text-lg">
          {data?.getCollectionById?.name} Collection
        </h2>

        {/* Invite */}
        <div
          className="flex items-center gap-2"
          onClick={() => navigate(`/invite-user/${_id}`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user-plus cursor-pointer"
            aria-label="Invite user"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" x2="19" y1="8" y2="14" />
            <line x1="22" x2="16" y1="11" y2="11" />
          </svg>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && <p className="mt-8 text-center text-xl">Loading...</p>}

      {/* Error Message */}
      {error && (
        <p className="text-error mt-8 text-center text-xl">{error.message}</p>
      )}

      {data?.getCollectionById && (
        <>
          {/*  Top Container */}
          <div className="mt-10 w-[90%] max-w-screen-md space-y-4 rounded-lg bg-background p-4 shadow-md md:mt-28 md:max-w-screen-lg lg:max-w-screen-lg">
            {/* Title and Status */}
            <div className="flex items-center md:flex-row md:justify-between">
              <h1 className="text-center text-2xl font-semibold md:text-left">
                {data?.getCollectionById?.name} Collection
              </h1>
              {/* Edit button */}
              <button
                className="hover:text-primary-dark ml-4 p-1 text-primary"
                onClick={() => navigate(`/edit-collection/${_id}`)}
                aria-label="Edit Collection"
              >
                <Edit3 className="h-5 w-5" />
              </button>
            </div>

            <hr className="my-4 hidden border-t-2 border-secondary md:block" />
            {/* Description */}
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-info"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="16" y2="12" />
                <line x1="12" x2="12" y1="8" y2="8" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Description
                </h3>
                <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
                  {data?.getCollectionById?.description || "No description"}
                </p>
              </div>
            </div>

            <hr className="my-2 border-muted" />

            {/* Members Section */}
            {/* Joined members section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user-check"
                >
                  <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  <polyline points="22 11 20 13 18 11" />
                </svg>
                <p className="text-sm sm:text-base md:text-lg">
                  <span className="font-semibold text-primary">
                    Joined Members:
                  </span>{" "}
                  <span>{members.length}</span> <span>People</span>
                </p>
                <button
                  className="rounded-full bg-primary px-4 py-1.5 text-background"
                  onClick={() => navigate(`/view-joined-members/${_id}`)}
                >
                  View
                </button>
              </div>
            </div>

            {/* Online Members Section */}
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-users"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>

                <p className="text-sm sm:text-base md:text-lg">
                  <span className="font-semibold text-primary">
                    Online Members:
                  </span>{" "}
                  <span>
                    {
                      members.filter((member: User) => {
                        return member.isOnline;
                      }).length
                    }
                  </span>{" "}
                  <span>People</span>
                </p>
                <button
                  className="rounded-full bg-primary px-4 py-1.5 text-background"
                  onClick={() => navigate(`/view-online-members/${_id}`)}
                >
                  View
                </button>
              </div>

              {/* Display up to 3 avatars */}
              <div className="mt-2 flex w-full items-center justify-center sm:justify-start">
                {members
                  .filter((member: User) => {
                    return member.isOnline > 0;
                  })
                  .map((member: User, index: number) => {
                    if (index < 3) {
                      return (
                        <div
                          key={index}
                          className="m-2 flex flex-col items-center"
                        >
                          <div className="relative">
                            {/* Avatar */}
                            <img
                              src={
                                member.avatar ||
                                "https://ui-avatars.com/api/?name=" +
                                  member.username
                              }
                              alt="User Avatar"
                              className="h-10 w-10 rounded-full shadow-md"
                            />
                            {
                              // eslint-disable-next-line no-unsafe-optional-chaining
                              member.isOnline && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500"></span>
                              )
                            }
                          </div>
                          {/* Username */}
                          <p className="mt-1 text-xs font-medium text-gray-700">
                            {member.username}
                          </p>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>

            {/* Buttons for group chat, invite user, insert applcation */}
            <div className="flex gap-4 pt-4">
              <button
                className="hover:bg-primary-dark hidden flex-1 rounded-full bg-primary py-2 text-sm font-semibold text-background transition md:block md:text-lg"
                onClick={() => navigate("/invite-user/:_id")}
              >
                Invite User
              </button>
              <button
                className="hover:bg-secondary-dark flex-1 rounded-full bg-secondary py-2 text-sm font-semibold text-primary transition sm:text-base md:text-lg"
                onClick={() => navigate(`/group-chat/${_id}`)}
              >
                Open Group Chat
              </button>
              <button
                className="hover:bg-primary-dark hidden flex-1 rounded-full bg-primary py-2 text-sm font-semibold text-background transition md:block md:text-lg"
                onClick={() =>
                  navigate("/insert-applications-to-collection/:_id")
                }
              >
                Insert Application
              </button>
            </div>
          </div>

          {/* Main Content */}
          <h1 className="mt-10 text-center text-2xl font-bold text-primary">
            Applications
          </h1>
          <hr className="my-4 w-[90%] border-t-2 border-primary" />

          {/* Applications */}
          <div className="mb-20 mt-6 grid w-full gap-4 px-4 pb-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
            {data?.getCollectionById?.applications?.map(
              (application: Application) => (
                <CollectionDetailCard
                  key={application._id}
                  application={application}
                />
              ),
            )}
          </div>
        </>
      )}
      <BottomNavigation />
    </div>
  );
}
