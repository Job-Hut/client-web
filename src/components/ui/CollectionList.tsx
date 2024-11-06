import { Card, CardTitle, CardDescription } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import dayjs from "dayjs";
import { Collection } from "@/lib/types";
import { Link, useNavigate } from "react-router-dom";

type CardProps = React.ComponentProps<typeof Card> & {
  collection: Collection;
};

export default function CollectionList({
  className,
  collection,
  ...props
}: CardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={cn("w-full gap-2.5 rounded-lg bg-background p-2", "h-auto")}
    >
      {/* Collection card linked to the detail page */}
      <Link to={`/collections/${collection._id}`}>
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

          {/* Application created date */}
          <CardDescription className="text-xs text-primary sm:text-sm md:text-base">
            {dayjs(collection.createdAt).format("DD MMMM YYYY")}
          </CardDescription>
        </Card>
      </Link>

      <Button
        className="mt-2 w-full bg-primary px-2 py-1 text-xs text-primary-foreground hover:text-background sm:px-3 sm:py-1.5 sm:text-sm md:text-base"
        onClick={() =>
          navigate(`/insert-applications-to-collection/${collection._id}`)
        }
      >
        + Application
      </Button>
    </div>
  );
}
