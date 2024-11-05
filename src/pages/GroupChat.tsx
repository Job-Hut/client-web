import ChatBubbleLeft from "@/components/ui/ChatBubbleLeft";
import ChatBubbleRight from "@/components/ui/ChatBubbleRight";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/use-auth";
import { Message } from "@/lib/types";

export default function GroupChat() {
  const { _id } = useParams();

  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Get Collection Data By ID
  const { data } = useQuery(
    gql`
      query GetCollectionById($id: ID!) {
        getCollectionById(id: $id) {
          _id
          name
          description
          ownerId
          sharedWith {
            _id
            username
          }
          applications {
            _id
            ownerId
            collectionId
            jobTitle
            description
            organizationName
            organizationAddress
          }
          createdAt
          updatedAt
          chat {
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
      }
    `,
    {
      variables: { id: _id },
    },
  );

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
      setMessages(data.getCollectionById.chat);
    }
  }, [data]);

  // Send message to server
  const sendMessage = async () => {
    sendMessageMutation();
  };

  return (
    <div className="max-w-screen flex h-screen w-full flex-col overflow-hidden bg-secondary">
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
      <div className="flex flex-1 flex-col space-y-4 overflow-y-auto p-4">
        {messages.map((message: Message) => {
          if (message.senderId._id === user!.id) {
            return <ChatBubbleRight key={message._id} message={message} />;
          }
          return <ChatBubbleLeft key={message._id} message={message} />;
        })}
      </div>

      {/* Input Area */}
      <div className="flex items-center border-t border-primary bg-background p-4">
        <Input
          placeholder="Start chatting here..."
          className="mr-2 flex-1 rounded-full border-primary"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          className="rounded-full bg-black px-4 py-2 text-background"
          onClick={() => sendMessage()}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
