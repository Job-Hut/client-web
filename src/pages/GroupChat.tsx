import ChatBubbleLeft from "@/components/ui/ChatBubbleLeft";
import ChatBubbleRight from "@/components/ui/ChatBubbleRight";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GroupChat() {
  return (
    <div className="flex h-screen w-full max-w-screen flex-col overflow-hidden bg-secondary">
      {/* Header */}
      <div className="w-full flex items-center justify-between bg-black p-4 text-background">
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
        <h2 className="font-semibold">Group Chat</h2>
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

      {/* Chat Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <ChatBubbleLeft />
        <ChatBubbleRight />
        <ChatBubbleLeft />
        <ChatBubbleRight />
        <ChatBubbleLeft />
      </div>

      {/* Input Area */}
      <div className="flex items-center border-t border-primary bg-background p-4">
        <Input
          placeholder="Start chatting here..."
          className="mr-2 flex-1 rounded-full border-primary"
        />
        <Button className="rounded-full bg-black px-4 py-2 text-background">
          Send
        </Button>
      </div>
    </div>
  );
}
