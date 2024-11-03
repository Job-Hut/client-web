import { Card, CardTitle, CardDescription } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type CardProps = React.ComponentProps<typeof Card>;

export default function CollectionDetailCard({
  className,
  ...props
}: CardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col justify-center overflow-hidden rounded-md",
        "h-[154px] w-[350px] p-3 my-[10px]",
        "border border-primary",
        className,
      )}
      {...props}
    >
      {/* Top container */}
      <div className="flex w-full flex-col space-y-1 rounded-md bg-[#FFE1CC] p-2">
        <Button
          variant={"secondary"}
          className={cn(
            "pointer-events-none w-1/3 rounded-full px-2 py-1 text-xs font-bold text-[#D39269]",
            className,
          )}
        >
          Due Tomorrow
        </Button>
        <CardDescription className="text-sm font-bold text-black">
          Airbnb
        </CardDescription>
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-sm">Backend Developer</CardTitle>
          {/* Company's logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
      <CardDescription className="mt-2 text-xs font-semibold">
        Task Todo:
      </CardDescription>

      {/* Application created date + Add application button */}
      <div className="mt-1 flex items-center justify-between">
        <CardDescription className="text-xs font-semibold text-black">
          Submit Updated Portfolio
        </CardDescription>
        <CardDescription className="text-xs font-semibold text-black">
          23/10/24
        </CardDescription>
      </div>
    </Card>
  );
}
