import { GET_AUTHENTICATED_USER } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "./avatar";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();
  const [slash, path] = pathname.split("/");
  const { data: userData } = useQuery(GET_AUTHENTICATED_USER);

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="z-50 w-full">
      <nav className="fixed hidden w-full bg-primary py-8 text-primary-foreground md:block">
        <div className="mx-auto max-w-screen-xl px-10">
          <ul className="flex items-center justify-between">
            <li>
              <Link to={"/"}>Logo</Link>
            </li>
            <div className="flex gap-10">
              <li>
                <Link to={"/jobs"}>Jobs</Link>
              </li>
              <li>
                <Link to={"/applications"}>Application</Link>
              </li>
              <li>
                <Link to={"/collections"}>Collections</Link>
              </li>
            </div>
            <li>
              <Link to={"/profile"}>
                <Avatar className="h-8 w-8">
                  <img
                    src={
                      userData?.getAuthenticatedUser.avatar ||
                      `https://api.dicebear.com/9.x/initials/svg?seed=${userData?.getAuthenticatedUser?.username}`
                    }
                    alt=""
                  />
                </Avatar>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="relative flex w-full items-center justify-center bg-black p-4 text-background md:hidden">
        <h2 className="font-semibold capitalize">
          {path ? path : "Upcoming Task"} List
        </h2>
        {path === "profile" && (
          <div
            onClick={handleLogOut}
            className="ease-linears absolute right-4 top-4 transition-all duration-100 hover:cursor-pointer active:translate-y-1"
          >
            <LogOut width={20} />
          </div>
        )}
      </div>
    </div>
  );
}
