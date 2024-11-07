import { Card, CardTitle, CardDescription } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Application } from "@/lib/types";
import { Link2, MapPin, Wallet } from "lucide-react";
import { useState } from "react";
import { formattedCurrency } from "@/utils/helper";

type CardProps = React.ComponentProps<typeof Card> & {
  application: Application;
  addToApplications: (application: Application) => void;
  removeFromApplications: (application: Application) => void;
};

export default function InsertApplicationCard({
  className,
  application,
  addToApplications,
  removeFromApplications,
  ...props
}: CardProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Card
      className={cn(
        "flex flex-col justify-center overflow-hidden rounded-lg",
        "w-full msm:p-2 md:p-4",
        "shadow-sm",
        isSelected ? "border border-primary" : "",
        className,
      )}
      {...props}
    >
      {/* Top container */}
      <div className="flex w-full flex-col space-y-1 rounded-lg bg-[#FFE1CC] p-3">
        <div className="flex w-full items-center gap-x-4">
          <img
            className="h-8 w-8 rounded-full bg-gray-300"
            src={
              application.organizationLogo
                ? application.organizationLogo
                : "https://via.placeholder.com/150"
            }
            alt=""
          />
          <div>
            <CardTitle className="text-xs font-normal sm:text-sm md:text-base">
              {application.jobTitle}
            </CardTitle>
            <CardDescription className="font-bold text-black sm:text-sm md:text-base">
              {application.organizationName}
            </CardDescription>
          </div>
          {/* Company's logo */}
        </div>
      </div>
      <div className="text-sm">
        <CardDescription className="mt-2 p-2">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Wallet width={16} />
                <p>
                  {formattedCurrency(application.salary) || "Not Specified"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin width={16} />
                <p>
                  {application.location
                    ? application.location
                    : "Not specified"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link2 width={16} />
                <a
                  href={application.source ? application.source : "#"}
                  className="text-blue-500"
                  target="_blank"
                >
                  Source
                </a>
              </div>
            </div>

            {/* Insert Button */}
            {isSelected ? (
              <Button
                variant="outline"
                className="bg-none"
                onClick={() => {
                  removeFromApplications(application);
                  setIsSelected(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="primary"
                  stroke="background"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-check"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </Button>
            ) : (
              <Button
                className="bg-none"
                onClick={() => {
                  addToApplications(application);
                  setIsSelected(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="primary"
                  stroke="background"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-plus"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
              </Button>
            )}
          </div>
        </CardDescription>
      </div>
    </Card>
  );
}
