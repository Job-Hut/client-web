import CollectionDetailCard from "@/components/ui/CollectionDetailCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CollectionDetail() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* Header */}
      <div className="flex w-full items-center justify-between bg-black p-4 text-background">
        {/* Back button */}
        <button className="text-lg" aria-label="Go back">
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
        <h2 className="font-semibold">Remote Job Collection</h2>
        {/* Online users count with tooltip */}
        {/* ! TODO: later inject how many users online here */}
        <div
          className="flex items-center gap-2"
          title="5 online"
          aria-label="5 users online"
        >
          <img
            src="https://github.com/shadcn.png"
            alt="Online users"
            className="h-6 w-6 rounded-full"
          />
        </div>
      </div>

      {/* Invite button */}
      <div className="flex w-[350px] justify-end">
        <Button className={cn("bg-[#88D1FF] text-primary")}>Invite</Button>
      </div>
      <CollectionDetailCard />
      <CollectionDetailCard />
      <Button className="mb-[20px] w-[350px] rounded-full">
        Add Application
      </Button>
    </div>
  );
}
