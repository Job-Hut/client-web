import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type NavIconProps = {
  icon: React.ReactNode;
  title: string;
  route: string;
};

export default function Navicon({ icon, title, route }: NavIconProps) {
  const { pathname } = useLocation();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    switch (pathname) {
      case "/":
        if (title === "Home") setIsActive(true);
        break;
      case "/jobs":
        if (title === "Jobs") setIsActive(true);
        break;
      case "/applications":
        if (title === "Application") setIsActive(true);
        break;
      case "/collections":
        if (title === "Collections") setIsActive(true);
        break;
      case "/profile":
        if (title === "Profile") setIsActive(true);
        break;
    }
  }, []);
  return (
    <Link
      to={route}
      className={`flex h-full w-12 flex-col items-center gap-1 px-5 py-5 text-sm transition-all duration-100 ease-linear active:bg-primary/5 msm:w-14 mlg:w-full ${isActive ? "border-t-2 border-primary" : ""}`}
    >
      <button title={title}>{icon}</button>
    </Link>
  );
}
