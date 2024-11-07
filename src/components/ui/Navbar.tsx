import { GET_AUTHENTICATED_USER } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "./avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();
  const [_, path] = pathname.split("/");
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
            <li className="w-1/6">
              <Link to={"/"}>
                <img
                  src="/logo/logo-long.svg"
                  alt="JobHut logo"
                  className="w-36"
                />
              </Link>
            </li>
            <div className="flex w-4/6 justify-center gap-10">
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
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="h-8 w-8">
                    <img
                      src={
                        userData?.getAuthenticatedUser.avatar ||
                        `https://api.dicebear.com/9.x/initials/svg?seed=${userData?.getAuthenticatedUser?.username}`
                      }
                      alt=""
                      className="cursor-pointer"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent side="bottom" align="end">
                  <div className="flex flex-col">
                    <Link to={"/profile"}>
                      <p>Profile</p>
                    </Link>
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
          </ul>
        </div>
      </nav>
      <div className="relative flex w-full items-center justify-center bg-black p-4 text-background md:hidden">
        <h2 className="font-semibold capitalize">
          {path ? path.split("-").join(" ") : "Upcoming Task"}
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
