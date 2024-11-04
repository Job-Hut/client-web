import CollectionDetailCard from "@/components/ui/CollectionDetailCard";
import Navbar from "@/components/ui/Navbar";
import { useNavigate } from "react-router-dom";

export default function CollectionDetail() {
  const navigate = useNavigate();
  const isPublic = true; // Needs to be adjusted later to show public/private

  const handleInvite = () => {
    navigate("/invite-user/:_id");
  };

  const handleOpenGroupChat = () => {
    navigate("/group-chat");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-secondary">
      {/* Navbar for bigger screen*/}
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
          Remote Job Collection
        </h2>

        {/* Invite */}
        <div className="flex items-center gap-2" onClick={handleInvite}>
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

      {/*  Top Container */}
      <div className="mt-20 w-[90%] max-w-screen-md space-y-4 rounded-lg bg-background p-4 shadow-md md:mt-28 md:max-w-screen-lg lg:max-w-screen-lg">
        {/* Title and Status */}
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <h1 className="text-center text-2xl font-semibold md:text-left">
            Remote Job Collection
          </h1>
          <span
            className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-poppins font-semibold uppercase tracking-wider ${
              isPublic
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            } md:ml-4 md:mt-0`}
          >
            {isPublic ? "Public" : "Private"}
          </span>
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
            <h3 className="text-lg font-semibold text-primary">Description</h3>
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni,
              aliquam.
            </p>
          </div>
        </div>

        <hr className="my-2 border-muted" />

        {/* Members Section */}
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
        </div>

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

        {/* Buttons for All Members and Group Chat */}
        <div className="flex gap-4 pt-4">
          <button
            className="hover:bg-primary-dark hidden flex-1 rounded-full bg-primary py-2 text-sm font-semibold text-background transition md:block md:text-lg"
            onClick={handleInvite}
          >
            Invite User
          </button>
          <button
            className="hover:bg-secondary-dark flex-1 rounded-full bg-secondary py-2 text-sm font-semibold text-primary transition sm:text-base md:text-lg"
            onClick={handleOpenGroupChat}
          >
            Open Group Chat
          </button>
        </div>
      </div>

      {/* Main Content */}
      <h1 className="mt-10 text-center text-2xl font-bold text-primary">
        Tasks
      </h1>
      <hr className="my-4 w-[90%] border-t-2 border-primary" />

      {/* Tasks */}
      <div className="mb-20 mt-6 grid w-full gap-4 px-4 pb-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        <CollectionDetailCard />
        <CollectionDetailCard />
        <CollectionDetailCard />
        <CollectionDetailCard />
      </div>
    </div>
  );
}
