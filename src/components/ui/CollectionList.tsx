import { Card, CardTitle, CardDescription } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type CardProps = React.ComponentProps<typeof Card>;

export default function CollectionList({ className, ...props }: CardProps) {
  return (
    <Card
      className={cn(
        "flex h-[154px] w-[350px] flex-col justify-center rounded-sm p-[8px] border-primary",
        className,
      )}
      {...props}
    >
      {/* Collection title + collection status */}
      <div className="mx-auto flex w-full items-center justify-between">
        <CardTitle>Collection Title</CardTitle>
        <Button variant={"secondary"} className="rounded-full">
          Private
        </Button>
      </div>
      {/* Application count */}
      <CardDescription className="my-[10px]">Collection: 3</CardDescription>
      {/* Application created date + Add application button */}
      <div className="mx-auto flex w-full items-center justify-between">
        <CardDescription>Collection Created Date</CardDescription>
        <Button>+ Application</Button>
      </div>
    </Card>
  );
}
