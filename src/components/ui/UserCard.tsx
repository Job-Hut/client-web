import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card } from "./card";

type User = {
  username: string;
  avatar?: string;
  isInvited: boolean;
  isOnline: boolean;
};

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  const { username, avatar, isOnline } = user;

  return (
    <div className="my-[5px] w-full">
      <Card className="flex items-center px-4 py-2 rounded-lg border border-primary shadow-lg w-full">
        <div className="relative flex w-full items-center gap-4">
          <div className="relative w-8 h-8">
            <Avatar>
              <AvatarImage
                src={avatar || "https://github.com/shadcn.png"}
                alt={`${username}'s avatar`}
                className="rounded-full w-full h-full"
              />
              <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            {/* Online/Offline Indicator */}
            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
              title={isOnline ? "Online" : "Offline"}
            ></span>
          </div>

          {/* Username */}
          <p className="w-full text-md font-semibold text-primary flex-1">{username}</p>
        </div>
      </Card>
    </div>
  );
}
