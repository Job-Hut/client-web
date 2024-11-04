import UserCard from "@/components/ui/UserCard";
import { useNavigate } from "react-router-dom";

export default function ViewMembers() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-secondary">
      {/* Navbar */}
      <div className="font-poppins fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-primary p-4 text-background shadow-md">
        <button
          className="text-lg"
          aria-label="Go back"
          onClick={() => navigate("/collections/:_id")}
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
          Members
        </h2>
      </div>

      {/* Users Container */}
      <div className="mt-20 w-11/12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:w-8/12 xl:grid-cols-4">
        <UserCard
          user={{
            username: "John Doe",
            avatarUrl: "https://example.com/johndoe.jpg",
            isInvited: true,
          }}
        />
        <UserCard
          user={{
            username: "Jane Smith",
            avatarUrl: "https://example.com/janesmith.jpg",
            isInvited: true,
          }}
        />
      </div>
    </div>
  );
}
