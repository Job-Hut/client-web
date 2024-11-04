import { Card, CardTitle, CardDescription } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type CardProps = React.ComponentProps<typeof Card>;

export default function CollectionList({ className, ...props }: CardProps) {
  return (
    <a href={"/applications/:_id"}>
      <div
        className={cn(
          "gap-2.5 rounded-lg bg-background p-2 w-full",
          "h-auto",
        )}
      >
        <Card
          className={cn(
            "flex flex-col justify-center rounded-lg",
            "p-4 w-full",
            "border-none shadow-sm",
            className,
          )}
          {...props}
        >
          {/* Collection title + collection status */}
          <div className="flex w-full items-center justify-between">
            <CardTitle className="mb-4 text-base font-semibold sm:text-lg md:text-xl">
              Collection Title
            </CardTitle>
            <Button
              variant="secondary"
              className="pointer-events-none mb-4 rounded-full px-3 py-1 text-xs sm:text-sm md:text-base"
            >
              Private
            </Button>
          </div>

          {/* Application count */}
          <CardDescription className="mb-2 text-xs sm:text-sm md:text-base text-primary">
            Collection: 3
          </CardDescription>

          {/* Application created date + Add application button */}
          <div className="flex w-full items-center justify-between">
            <CardDescription className="text-xs sm:text-sm md:text-base text-primary">
              01/01/2011
            </CardDescription>
            <Button className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm md:text-base">
              + Application
            </Button>
          </div>
        </Card>
      </div>
    </a>
  );
}
