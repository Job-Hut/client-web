import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardDescription } from "./card";
import { Message } from "@/lib/types";

type ChatBubbleRightProps = {
  message: Message;
};

export default function ChatBubbleRight({ message }: ChatBubbleRightProps) {
  return (
    <div className="flex items-start space-x-3 self-end">
      {/* Chat Bubble */}
      <Card className="flex max-w-[80%] flex-col rounded-lg border border-primary bg-background p-4 shadow-md">
        <CardDescription className="mb-1 self-end font-semibold text-primary">
          {message.senderId?.username}
        </CardDescription>
        <CardDescription className="text-primary">
          {message.content}
        </CardDescription>
      </Card>

      {/* Avatar */}
      <Avatar className="h-8 w-8 self-start">
        <AvatarImage
          src={message.senderId?.avatar || `https://github.com/shadcn.png`}
          className="rounded-full"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
