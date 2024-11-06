import { Application } from "@/lib/types";
import dayjs from "dayjs";
import { Link, useLocation } from "react-router-dom";

type Props = {
  application: Application;
};

export default function ApplicationCard({ application }: Props) {
  const dueDate = dayjs(application.tasks[0].dueDate);
  const daysLeft = dueDate.diff(dayjs(), "day") + 0;
  const { pathname: fromPage } = useLocation();

  let dueMessage;
  if (daysLeft === 0) {
    dueMessage = "Due today";
  } else if (daysLeft === 1) {
    dueMessage = "Due tomorrow";
  } else if (daysLeft > 1) {
    dueMessage = `Due in ${daysLeft} days`;
  } else {
    dueMessage = "Past due";
  }

  return (
    <Link to={`/applications/${application._id}`} state={{ fromPage }}>
      <div className="flex h-full flex-col justify-between gap-2.5 rounded-lg bg-card p-2 shadow-md">
        <div className="flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-lg bg-application-submitted p-4">
          <span
            className={`h-fit w-fit rounded-full bg-card px-2 py-1 text-xs font-medium text-red-500`}
          >
            {/* how do i get how much day before the due date */}
            {dueMessage}
          </span>

          <div className="flex items-center gap-3">
            <img
              className="h-8 w-8 rounded-full bg-[#FF5A5F] object-cover"
              src={application.organizationLogo}
              alt=""
            />

            <div>
              <p className="text-sm">{application.organizationName}</p>
              <p className="text-sm font-bold">{application.jobTitle}</p>
            </div>
          </div>
        </div>
        <div className="px-4">
          <p className="text-sm">Task Todo:</p>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium">
              {application.tasks[0].title}
            </span>
            <span className="text-sm font-medium">
              {dayjs(application.tasks[0].dueDate).format("DD/MM/YYYY")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
