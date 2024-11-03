import {
  Home as Homeicon,
  Briefcase,
  Folder,
  User,
  NotepadText,
  Plus,
  CircleUserRound,
} from "lucide-react";
import Navicon from "./Navicon";
import { Button } from "./button";
import { Link } from "react-router-dom";

export default function Navbar() {
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
                <Link to={"/"}>Jobs</Link>
              </li>
              <li>
                <Link to={"/"}>Application</Link>
              </li>
              <li>
                <Link to={"/"}>Collections</Link>
              </li>
            </div>
            <li>
              <Link to={"/"}>
                <CircleUserRound />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="fixed bottom-28 left-1/2 mx-auto flex w-11/12 -translate-x-1/2 transform justify-end sm:w-8/12 md:hidden">
        <Button variant={"floating"}>
          <Plus />
        </Button>
      </div>
      <nav className="fixed bottom-5 left-1/2 mx-auto flex w-11/12 -translate-x-1/2 transform justify-between overflow-hidden rounded-xl bg-card shadow-lg sm:w-8/12 md:hidden">
        <Navicon icon={<Homeicon />} title="Home" route="/" />
        <Navicon icon={<Briefcase />} title="Jobs" route="/jobs" />
        <Navicon
          icon={<NotepadText />}
          title="Application"
          route="/applications"
        />
        <Navicon icon={<Folder />} title="Collections" route="/collections" />
        <Navicon icon={<User />} title="Profile" route="/profile" />
      </nav>
    </div>
  );
}
