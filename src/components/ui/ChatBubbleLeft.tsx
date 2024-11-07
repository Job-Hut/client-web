import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardDescription } from "./card";
import { Message } from "@/lib/types";

type ChatBubbleLeftProps = {
  message: Message;
};

export default function ChatBubbleLeft({ message }: ChatBubbleLeftProps) {
  return (
    <div className="flex items-start space-x-3">
      {/* Avatar */}
      <Avatar className="h-8 w-8 self-start">
        <AvatarImage
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${message.senderId.username}`}
          className="rounded-full"
        />
      </Avatar>

      {/* Chat Bubble */}
      <Card className="flex max-w-[80%] flex-col rounded-lg border border-primary bg-background p-4 shadow-md">
        <CardDescription className="mb-1 font-semibold text-primary">
          {message.senderId?.username}
        </CardDescription>
        <CardDescription className="text-primary">
          {message.content}
        </CardDescription>
      </Card>
    </div>
  );
}
