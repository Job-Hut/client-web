import { createContext } from "react";
import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_USER_PRESENCE } from "@/lib/subscription";

const OnlinePresenceContext = createContext(null);

export const OnlinePresenceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useSubscription(SUBSCRIBE_USER_PRESENCE);

  return (
    <OnlinePresenceContext.Provider value={null}>
      {children}
    </OnlinePresenceContext.Provider>
  );
};
