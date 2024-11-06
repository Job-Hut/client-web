import { GET_AUTHENTICATED_USER } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "./avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Navbar() {
  const { pathname } = useLocation();
  const [_, path] = pathname.split("/");
  const { data: userData } = useQuery(GET_AUTHENTICATED_USER);
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
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="h-8 w-8">
                    <img
                      src={
                        userData?.getAuthenticatedUser.avatar ||
                        `https://avatar.iran.liara.run/username?username=${userData?.getAuthenticatedUser?.username}`
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
      <div className="flex w-full items-center justify-center bg-black p-4 text-background md:hidden">
        <h2 className="font-semibold capitalize">
          {path ? path.split("-").join(" ") : "Upcoming Task"}
        </h2>
      </div>
    </div>
  );
}
