import useAuth from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

/**
 * GuardGuest component
 *
 * This component is used to protect routes that should only be accessible to guests (unauthenticated users).
 * It checks if the user is authenticated using the useAuth hook.
 * If the user is authenticated, it redirects to the home page.
 * If the user is not authenticated, it renders the children components.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to render if the user is not authenticated.
 * @returns {JSX.Element} - The rendered component.
 */
export default function GuardGuest({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}
