import Navbar from "@/components/ui/Navbar";
import UserCard from "@/components/ui/UserCard";
import { useNavigate } from "react-router-dom";

export default function ViewMembers() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-secondary">
      {/* Navbar */}
      <Navbar />
      <div className="mt-10 md:mt-40 w-11/12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:w-8/12 xl:grid-cols-4">
        <UserCard
          user={{
            username: "John Doe",
            isInvited: true,
          }}
        />
        <UserCard
          user={{
            username: "Jane Smith",
            isInvited: true,
          }}
        />
      </div>
    </div>
  );
}
