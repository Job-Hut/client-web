import ChatBubbleLeft from "@/components/ui/ChatBubbleLeft";
import ChatBubbleRight from "@/components/ui/ChatBubbleRight";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { FormEvent, useEffect, useState } from "react";
import useAuth from "@/hooks/use-auth";
import { Message } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { GET_COLLECTION_DETAIL } from "@/lib/queries";

export default function GroupChat() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Get Collection Data By ID
  const { data } = useQuery(GET_COLLECTION_DETAIL, {
    variables: { id: _id },
    fetchPolicy: "network-only",
  });

  // Watch or Observe for the incoming message
  const { data: newMessage } = useSubscription(
    gql`
      subscription NewMessage($collectionId: ID!) {
        newMessage(collectionId: $collectionId) {
          _id
          senderId {
            _id
            avatar
            username
          }
          content
          createdAt
          updatedAt
        }
      }
    `,
    {
      variables: {
        collectionId: _id,
      },
    },
  );

  // Send message mutation for sending message to the server
  const [sendMessageMutation] = useMutation(
    gql`
      mutation AddMessageToChat($collectionId: ID!, $message: String) {
        addMessageToChat(collectionId: $collectionId, message: $message) {
          _id
        }
      }
    `,
    {
      variables: {
        collectionId: _id,
        message,
      },
    },
  );

  // Push new message to the messages state
  useEffect(() => {
    if (newMessage) {
      setMessages((prevMessages) => [...prevMessages, newMessage.newMessage]);
    }
  }, [newMessage]);

  // Set initial messages to state
  useEffect(() => {
    if (data) {
      console.log(data);
      setMessages(data.getCollectionById.chat);
    }
  }, [data]);

  // Send message to server
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessageMutation();
    setMessage("");
  };

  return (
    <div className="max-w-screen flex h-screen w-full flex-col overflow-hidden bg-secondary">
      {/* Navbar */}
      <div className="font-poppins fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-primary p-4 text-background shadow-md">
        <button
          className="text-lg"
          aria-label="Go back"
          onClick={() => navigate(`/collections/${_id}`)}
        >
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

        <h2 className="absolute left-1/2 -translate-x-1/2 transform text-base font-semibold sm:text-lg">
          Group Chat
        </h2>
      </div>

      {/* Chat Messages */}
      <div className="mt-20 flex flex-1 flex-col space-y-4 overflow-y-auto p-4">
        {messages.map((message: Message) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (message.senderId._id === user!.id) {
            return <ChatBubbleRight key={message._id} message={message} />;
          }
          return <ChatBubbleLeft key={message._id} message={message} />;
        })}
      </div>

      {/* Input Area */}
      <form
        onSubmit={sendMessage}
        className="flex items-center border-t border-primary bg-background p-4"
      >
        <Input
          placeholder="Start chatting here..."
          className="mr-2 flex-1 rounded-full border-primary"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="rounded-full bg-black px-4 py-2 text-background">
          Send
        </Button>
      </form>
    </div>
  );
}
