import { CircleUserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const [slash, path] = pathname.split("/");
  return (
    <div className="w-full">
      <nav className="fixed hidden w-full bg-primary py-8 text-primary-foreground md:block">
        <div className="mx-auto max-w-screen-xl px-10">
          <ul className="flex justify-between">
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
                <CircleUserRound />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="flex w-full items-center justify-center bg-black p-4 text-background md:hidden">
        <h2 className="font-semibold capitalize">
          {path ? path : "Upcoming Task"} List
        </h2>
      </div>
    </div>
  );
}
