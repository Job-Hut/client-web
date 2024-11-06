import UserCard from "@/components/ui/UserCard";
import Navbar from "@/components/ui/Navbar";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function InviteToGroup() {
  const navigate = useNavigate();
  const { _id } = useParams();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-secondary">
      {/* Navbar */}
      <Navbar />

      <div className="min-h-screen w-full px-4 pb-20 pt-10 sm:px-[5%] md:px-[10%] md:pt-28 lg:px-[15%]">
        <h1 className="hidden mb-6 text-center text-2xl font-semibold text-gray-800 md:block">
          Invite Users to Group
        </h1>
        <div className="mb-4">
          <Input type="text" placeholder="Search..." inputSize={"small"} />
        </div>
        {/* Responsive Grid for User Cards */}
        <div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <UserCard
            user={{
              username: "John Doe",
              isInvited: false,
            }}
          />
          <UserCard user={{ username: "Jane Smith", isInvited: true }} />
          <UserCard user={{ username: "Jonas Smith", isInvited: true }} />
        </div>
      </div>
    </div>
  );
}
