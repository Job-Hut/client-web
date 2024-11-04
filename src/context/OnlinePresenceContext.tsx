import { createContext, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import useAuth from "@/hooks/use-auth";

const UPDATE_USER_PRESENCE = gql`
  mutation UpdateUserPresence($isOnline: Boolean!) {
    updateUserPresence(isOnline: $isOnline) {
      _id
      username
      avatar
      fullName
      email
      password
      collections {
        _id
      }
      isOnline
      createdAt
      updatedAt
    }
  }
`;

const OnlinePresenceContext = createContext(null);

export const OnlinePresenceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();

  const [updateUserPresence] = useMutation(UPDATE_USER_PRESENCE);

  useEffect(() => {
    const setOnline = () =>
      updateUserPresence({ variables: { isOnline: true } });
    const setOffline = () =>
      updateUserPresence({ variables: { isOnline: false } });

    if (user) {
      setOnline();

      window.addEventListener("online", setOnline);
      window.addEventListener("offline", setOffline);
      window.addEventListener("beforeunload", setOffline);
    }

    return () => {
      if (user) {
        setOffline();
        window.removeEventListener("online", setOnline);
        window.removeEventListener("offline", setOffline);
        window.removeEventListener("beforeunload", setOffline);
      }
    };
  }, [updateUserPresence]);

  if (!user) {
    return children;
  }

  return (
    <OnlinePresenceContext.Provider value={null}>
      {children}
    </OnlinePresenceContext.Provider>
  );
};
