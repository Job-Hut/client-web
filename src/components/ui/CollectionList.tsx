import { Card, CardTitle, CardDescription } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import dayjs from "dayjs";
import { Collection } from "@/lib/types";
import { Link } from "react-router-dom";

type CardProps = React.ComponentProps<typeof Card> & {
  collection: Collection;
};

export default function CollectionList({
  className,
  collection,
  ...props
}: CardProps) {
  return (
    <Link to={`/collections/${collection._id}`}>
      <div
        className={cn("w-full gap-2.5 rounded-lg bg-background p-2", "h-auto")}
      >
        <Card
          className={cn(
            "flex flex-col justify-center rounded-lg",
            "w-full p-4",
            "border-none shadow-sm",
            className,
          )}
          {...props}
        >
          {/* Collection title + collection status */}
          <div className="flex w-full items-center justify-between">
            <CardTitle className="mb-4 text-base font-semibold sm:text-lg md:text-xl">
              {collection.name}
            </CardTitle>
          </div>

          {/* Application count */}
          <CardDescription className="mb-2 text-xs text-primary sm:text-sm md:text-base">
            Collection: {collection.applications?.length} Application(s)
          </CardDescription>

          {/* Application created date + Add application button */}
          <div className="flex w-full items-center justify-between">
            <CardDescription className="text-xs text-primary sm:text-sm md:text-base">
              {dayjs(collection.createdAt).format("DD MMMM YYYY")}
            </CardDescription>
            <Button className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm md:text-base">
              + Application
            </Button>
          </div>
        </Card>
      </div>
    </Link>
  );
}
