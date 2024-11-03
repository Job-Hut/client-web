import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardDescription } from "./card";

export default function ChatBubbleRight() {
  return (
    <div className="flex items-start space-x-3">
      {/* Chat Bubble */}
      <Card className="flex max-w-[80%] flex-col rounded-lg border border-primary bg-background p-4 shadow-md">
        <CardDescription className="mb-1 font-semibold text-primary">
          username
        </CardDescription>
        <CardDescription className="text-primary">
          The React Framework - created and maintained by @vercel. Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Minima quam modi totam?
          Blanditiis, ex totam? Quia ad explicabo temporibus aliquam et
          doloribus cumque recusandae a doloremque aut, ipsum velit nesciunt
          placeat officiis quas.
        </CardDescription>
      </Card>

      {/* Avatar */}
      <Avatar className="h-8 w-8 self-start">
        <AvatarImage
          src="https://github.com/shadcn.png"
          className="rounded-full"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
