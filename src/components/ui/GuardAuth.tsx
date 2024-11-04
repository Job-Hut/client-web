import useAuth from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

/**
 * GuardAuth component
 *
 * This component is used to protect routes that require authentication.
 * It checks if the user is authenticated using the useAuth hook.
 * If the user is not authenticated, it redirects to the login page.
 * If the user is authenticated, it renders the children components.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to render if the user is authenticated.
 * @returns {JSX.Element} - The rendered component.
 */
export default function GuardAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
