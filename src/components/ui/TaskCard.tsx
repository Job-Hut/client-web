import { EllipsisVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";

const tasks = [
  {
    title: "Your call has been confirmed.",
    due: "22/04/24",
  },
  {
    title: "You have a new message!",
    due: "22/04/24",
  },
  {
    title: "Your subscription is expiring soon!",
    due: "22/04/24",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export default function TaskCard({ className, ...props }: CardProps) {
  return (
    <>
      <Tabs
        defaultValue="todo"
        className="flex flex-col justify-between gap-2.5 rounded-lg bg-card p-2 pb-5 shadow-md"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="todo">Todo List</TabsTrigger>
          <TabsTrigger value="add">Add Todo</TabsTrigger>
        </TabsList>
        <TabsContent value="todo">
          <div
            className={cn(
              "flex flex-col justify-between gap-5 px-2",
              className,
            )}
            {...props}
          >
            <div className="flex flex-col gap-2">
              <CardTitle>Todo list</CardTitle>
              <CardDescription>You have 3 unfinished tasks</CardDescription>
            </div>
            <div className="flex flex-col gap-4">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b-2 pb-4 last-of-type:border-none last-of-type:pb-0"
                >
                  <div className="flex items-center gap-2 text-xs leading-none">
                    <Checkbox id={task.title} />
                    <div className="flex flex-col gap-2">
                      <label htmlFor={task.title} className="font-bold">
                        {task.title}
                      </label>
                      <p>{task.due}</p>
                    </div>
                  </div>
                  <div>
                    <EllipsisVertical />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="add">
          <div
            className={cn(
              "flex flex-col justify-between gap-2.5 px-2",
              className,
            )}
            {...props}
          >
            <form className="flex flex-col gap-4">
              <Input placeholder="What to do" type="text" inputSize={"small"} />
              <Textarea
                placeholder="Brief description"
                className="border border-primary"
              />
              <Input placeholder="Deadline" type="date" inputSize={"small"} />
              <div className="flex w-full flex-col gap-2">
                <Button>Add New Task</Button>
                <Button>Generate with AI</Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
