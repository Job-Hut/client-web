import { Button } from "@/components/ui/button";
import InviteUserCard from "@/components/ui/InviteUserCard";

export default function InviteToGroup() {
  return (
    <div className="h-screen w-full px-[5%]">
      <Button className="w-full my-[10px]">Username</Button>
      <InviteUserCard />
      <InviteUserCard />
      <InviteUserCard />
    </div>
  );
}
