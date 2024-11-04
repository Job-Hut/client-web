import { Button } from "@/components/ui/button";
import UserCard from "@/components/ui/UserCard";

export default function InviteToGroup() {
  return (
    <div className="h-screen w-full px-[5%]">
      <Button className="w-full my-[10px]">Username</Button>
      <UserCard user={{ username: "John Doe", avatarUrl: "https://example.com/johndoe.jpg", isInvited: false }} />
      <UserCard user={{ username: "Jane Smith", isInvited: true }} />
      <UserCard user={{ username: "Jonas Smith", isInvited: true }} />
    </div>
  );
}
