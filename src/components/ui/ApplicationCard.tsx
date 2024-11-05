import { Application } from "@/lib/types";
import { Link } from "react-router-dom";

type Props = {
  application: Application;
};

export default function ApplicationCard({ application }: Props) {
  return (
    <Link to={`/applications/${application._id}`}>
      <div className="flex flex-col justify-between gap-2.5 rounded-lg bg-card p-2 shadow-md">
        <div className="flex w-full flex-col items-start justify-between gap-2.5 rounded-lg bg-application-submitted p-4">
          <span
            className={`h-fit w-fit rounded-full bg-card px-2 py-1 text-xs font-medium text-red-500`}
          >
            Due Today
          </span>

          <div className="flex items-center gap-3">
            <img
              className="h-8 w-8 rounded-full bg-[#FF5A5F] p-2"
              src={application.organizationLogo}
              alt=""
            />

            <div>
              <p className="text-sm">Airbnb</p>
              <p className="text-sm font-bold">Backend Developer</p>
            </div>
          </div>
        </div>
        <div className="px-4">
          <p className="text-sm">Task Todo:</p>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium">Create CV</span>
            <span className="text-sm font-medium">23/10/24</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
