import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardDescription } from "./card";
import { User } from "@/lib/types";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { INVITE_USER_TO_COLLECTION } from "@/lib/mutation";
import { useToast } from "@/hooks/use-toast";

type UserCardProps = {
  user: User;
  collectionId: string;
  invited?: boolean;
};

export default function UserCard({
  user,
  collectionId,
  invited = true,
}: UserCardProps) {
  const [isInvited, setIsInvited] = useState(invited);

  const { toast } = useToast();

  const [inviteMutation] = useMutation(INVITE_USER_TO_COLLECTION);

  const handleInvite = async () => {
    try {
      setIsInvited(true);
      await inviteMutation({
        variables: {
          collectionId,
          userIds: [user._id],
        },
      });
      toast({
        title: "User invited",
        description: `${user.username} has been invited to the group.`,
      });
    } catch (error) {
      console.error(error);
      setIsInvited(false);
      toast({
        title: "Error",
        description: "Failed to invite user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="my-[5px] w-full">
      <Card className="flex w-full items-center justify-between rounded-lg border border-primary p-4 shadow-lg">
        <div className="flex items-center gap-x-4">
          {/* Avatar */}
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                user.avatar ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`
              }
              alt={`${user.username}'s avatar`}
              className="rounded-full"
            />
            <AvatarFallback>
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Username */}
          <CardDescription className="flex-1 text-center font-semibold text-black">
            {user.username}
          </CardDescription>
        </div>
        {!isInvited && (
          <button
            aria-label="Invite user"
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            onClick={handleInvite}
          >
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
        )}
      </Card>
    </div>
  );
}
