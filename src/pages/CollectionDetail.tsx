import CollectionDetailCard from "@/components/ui/CollectionDetailCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CollectionDetail() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
        {/* Invite button */}
      <div className="flex w-[350px] justify-end">
        <Button className={cn("bg-[#88D1FF] text-primary")}>Invite</Button>
      </div>
      <CollectionDetailCard />
      <CollectionDetailCard />
      <Button className="mb-[20px] w-[350px] rounded-full">Add Application</Button>
    </div>
  );
}
