import {
  Home as Homeicon,
  Briefcase,
  Folder,
  User,
  NotepadText,
  Plus,
} from "lucide-react";
import Navicon from "./Navicon";
import { Button } from "./button";
import { useLocation } from "react-router-dom";

export default function BottomNavigation() {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/" && pathname !== "/jobs" && pathname !== "/profile" && (
        <div className="fixed bottom-28 left-1/2 mx-auto flex w-11/12 -translate-x-1/2 transform justify-end sm:w-8/12 md:hidden">
          <Button variant={"floating"}>
            <Plus />
          </Button>
        </div>
      )}
      <div className="fixed bottom-0 h-20 w-full bg-secondary">
        <nav className="fixed left-1/2 mx-auto flex w-11/12 -translate-x-1/2 transform justify-between overflow-hidden rounded-xl bg-card shadow-lg md:hidden">
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
    </>
  );
}
