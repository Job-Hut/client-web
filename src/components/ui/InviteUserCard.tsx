import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardDescription } from "./card";

export default function InviteUserCard() {
  return (
    <div className="w-full my-[10px]">
      <Card className="flex items-center justify-between p-4 rounded-lg border border-primary shadow-lg w-full max-w-md">
        {/* Avatar */}
        <Avatar className="w-10 h-10">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="User avatar"
            className="rounded-full"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>

        {/* Username */}
        <CardDescription className="flex-1 text-center font-semibold text-black">
          username
        </CardDescription>

        {/* Invite Icon */}
        <button aria-label="Invite user" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="primary"
            stroke="background"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
        </button>
      </Card>
    </div>
  );
}
