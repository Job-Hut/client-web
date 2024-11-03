import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardDescription } from "./card";

export default function ChatBubbleLeft() {
  return (
    <div className="flex items-start space-x-3">
      {/* Avatar */}
      <Avatar className="self-start w-8 h-8">
        <AvatarImage
          src="https://github.com/shadcn.png"
          className="rounded-full"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* Chat Bubble */}
      <Card className="flex flex-col p-4 rounded-lg border border-primary shadow-md bg-background max-w-[80%]">
        <CardDescription className="font-semibold text-primary mb-1">
          username
        </CardDescription>
        <CardDescription className="text-primary">
          The React Framework - created and maintained by @vercel. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Minima quam modi totam? Blanditiis, ex totam? Quia ad
          explicabo temporibus aliquam et doloribus cumque recusandae a doloremque aut, ipsum
          velit nesciunt placeat officiis quas.
        </CardDescription>
      </Card>
    </div>
  );
}
