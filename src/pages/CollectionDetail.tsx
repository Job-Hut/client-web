import CollectionDetailCard from "@/components/ui/CollectionDetailCard";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Application } from "@/lib/types";
import Navbar from "@/components/ui/Navbar";
import BottomNavigation from "@/components/ui/BottomNavigation";
import { Edit3 } from "lucide-react";

export default function CollectionDetail() {
  const { _id } = useParams();

  const { data, loading, error } = useQuery(
    gql`
      query GetCollectionById($id: ID!) {
        getCollectionById(id: $id) {
          _id
          name
          description
          ownerId
          sharedWith {
            _id
            username
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
        }
      }
    `,
    {
      variables: { id: _id },
    },
  );

  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-secondary">
      {/* Navbar for bigger screen*/}
      {/* <div className="w-full">
        <nav className="fixed hidden w-full bg-primary py-8 text-primary-foreground md:block">
          <div className="mx-auto max-w-screen-xl px-10">
            <ul className="flex justify-between">
              <li>
                <Link to={"/"}>Logo</Link>
              </li>
              <div className="flex gap-10">
                <li>
                  <Link to={"/"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/"}>Application</Link>
                </li>
                <li>
                  <Link to={"/"}>Collections</Link>
                </li>
              </div>
              <li>
                <Link to={"/"}>
                  <CircleUserRound />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="fixed bottom-28 left-1/2 mx-auto flex w-11/12 -translate-x-1/2 transform justify-end sm:w-8/12 md:hidden">
          <Button
            variant={"floating"}
            onClick={() => navigate("/insert-applications-to-collection/:_id")}
          >
            <Plus />
          </Button>
        </div>
        <nav className="fixed bottom-5 left-1/2 mx-auto flex w-11/12 -translate-x-1/2 transform justify-between overflow-hidden rounded-xl bg-card shadow-lg sm:w-8/12 md:hidden">
          <Navicon icon={<Homeicon />} title="Home" route="/" />
          <Navicon icon={<Briefcase />} title="Jobs" route="/jobs" />
          <Navicon
            icon={<NotepadText />}
            title="Application"
            route="/applications"
          />
          <Navicon icon={<Folder />} title="Collections" route="/collections" />
          <Navicon icon={<User />} title="Profile" route="/profile" />
        </nav>
      </div> */}
      <Navbar />

      {/* Navbar for smaller screen */}
      <div className="font-poppins fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-primary p-4 text-background shadow-md md:hidden">
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
                  5 people
                </p>
                <button
                  className="rounded-full bg-primary px-4 py-1.5 text-background"
                  onClick={() => navigate("/view-joined-members/:_id")}
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
                  2 people
                </p>
                <button
                  className="rounded-full bg-primary px-4 py-1.5 text-background"
                  onClick={() => navigate("/view-online-members/:_id")}
                >
                  View
                </button>
              </div>

              {/* Display up to 3 avatars */}
              <div className="mt-2 flex w-full items-center justify-center sm:justify-start">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="m-2 flex flex-col items-center">
                    <div className="relative">
                      {/* Avatar */}
                      <img
                        src="https://via.placeholder.com/40"
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full shadow-md"
                      />
                      {/* Online Indicator */}
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500"></span>
                    </div>
                    {/* Username */}
                    <p className="mt-1 text-xs font-medium text-gray-700">
                      Username{index + 1}
                    </p>
                  </div>
                ))}
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
