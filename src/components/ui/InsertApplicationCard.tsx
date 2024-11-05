import { Card, CardTitle, CardDescription } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type CardProps = React.ComponentProps<typeof Card>;

export default function InsertApplicationCard({
  className,
  ...props
}: CardProps) {
  const isSelected = false; //Needs to be changed with use state management later

  return (
    <Card
      className={cn(
        "flex flex-col justify-center overflow-hidden rounded-lg",
        "msm:p-2 my-4 w-full md:p-4",
        "shadow-sm",
        isSelected ? "border border-primary" : "",
        className,
      )}
      {...props}
    >
      {/* Top container */}
      <div className="flex w-full flex-col space-y-1 rounded-lg bg-[#FFE1CC] p-3">
        <div className="flex w-full justify-between">
          <Button
            variant={"secondary"}
            className={cn(
              "pointer-events-none w-1/2 mlg:w-1/3 rounded-full px-2 py-1 text-xs font-bold text-[#D39269]",
              "sm:text-sm md:text-base",
              className,
            )}
          >
            Due Tomorrow
          </Button>

          {/* Insert Button */}
          {isSelected ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="primary"
              stroke="background"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-check"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="primary"
              stroke="background"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-plus"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          )}
        </div>
        <CardDescription className="text-xs font-bold text-black sm:text-sm md:text-base">
          Airbnb
        </CardDescription>
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-xs sm:text-sm md:text-base">
            Backend Developer
          </CardTitle>
          {/* Company's logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-building-2"
          >
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
          </svg>
        </div>
      </div>

      {/* Task Todo */}
      <CardDescription className="mt-2 text-xs font-semibold sm:text-sm md:text-base">
        Task Todo:
      </CardDescription>

      {/* Application created date + Task description */}
      <div className="mt-1 flex w-full items-center justify-between">
        <CardDescription className="text-xs font-semibold text-black sm:text-sm md:text-base">
          Submit Updated Portfolio
        </CardDescription>
        <CardDescription className="text-xs font-semibold text-black sm:text-sm md:text-base">
          23/10/24
        </CardDescription>
      </div>
    </Card>
  );
}
