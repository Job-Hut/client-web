import UserCard from "@/components/ui/UserCard";
import Navbar from "@/components/ui/Navbar";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_USERS } from "@/lib/queries";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";

export default function InviteToGroup() {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [search, setSearch] = useState("");

  const [usersQuery, { data }] = useLazyQuery(GET_ALL_USERS);

  useEffect(() => {
    usersQuery();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-secondary">
      {/* Navbar */}
      <Navbar />

      {/* Navbar for smaller screen */}
      <div className="font-poppins fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-primary p-4 text-background shadow-md md:hidden">
        <button
          className="text-lg"
          aria-label="Go back"
          onClick={() => navigate(`/collections/${_id}`)}
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
          Invite Users
        </h2>
      </div>

      <div className="min-h-screen w-full px-4 pb-20 pt-10 sm:px-[5%] md:px-[10%] md:pt-28 lg:px-[15%]">
        <h1 className="mb-6 hidden text-center text-2xl font-semibold text-gray-800 md:block">
          Invite Users to Group
        </h1>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search..."
            inputSize={"small"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Responsive Grid for User Cards */}
        <div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data?.getAllUsers
            ?.filter(
              (user: User) =>
                user.collections?.every(
                  (collection) => collection._id !== _id,
                ) || user.collections === undefined,
            )
            .map((user: User) => (
              <UserCard
                key={user._id}
                user={user}
                collectionId={_id!}
                invited={false}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
