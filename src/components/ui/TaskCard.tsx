import { EllipsisVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { Task } from "@/lib/types";
import dayjs from "dayjs";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type CardProps = React.ComponentProps<typeof Card> & {
  tasks: Task[];
  applicationId?: string;
  children?: React.ReactNode;
};

export default function TaskCard({
  className,
  applicationId,
  tasks = [],
  ...props
}: CardProps) {
  const [input, setInput] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const [addTaskMutation] = useMutation(gql`
    mutation AddTaskToApplication($applicationId: ID!, $input: TaskInput) {
      addTaskToApplication(applicationId: $applicationId, task: $input) {
        _id
      }
    }
  `);

  const [generateTasksMutation] = useMutation(
    gql`
      mutation GetTasksGeneratedByAi($id: ID!) {
        getTasksGeneratedByAi(_id: $id) {
          title
          description
          dueDate
          createdAt
          updatedAt
          completed
        }
      }
    `,
    {
      variables: {
        id: applicationId,
      },
    },
  );

  const handleAddTask = async () => {
    try {
      if (!input.title || !input.description || !input.dueDate) {
        return;
      }
      await addTaskMutation({
        variables: {
          applicationId,
          input: {
            title: input.title,
            description: input.description,
            dueDate: input.dueDate,
          },
        },
      });
      navigate(`/applications/${applicationId}`);
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as Error).message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateTasks = async () => {
    try {
      await generateTasksMutation();
      navigate(`/applications/${applicationId}`);
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as Error).message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

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
              <CardDescription>
                You have {tasks.filter((task) => !task.completed).length}{" "}
                unfinished tasks
              </CardDescription>
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
                      <p>{dayjs(task.dueDate).format("DD/MM/YYYY")},</p>
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
              <Input
                placeholder="What to do"
                type="text"
                inputSize={"small"}
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
                required
              />
              <Textarea
                placeholder="Brief description"
                className="border border-primary"
                value={input.description}
                onChange={(e) =>
                  setInput({ ...input, description: e.target.value })
                }
                required
              />
              <Input
                placeholder="Deadline"
                type="date"
                inputSize={"small"}
                value={input.dueDate}
                onChange={(e) =>
                  setInput({ ...input, dueDate: e.target.value })
                }
                required
              />
              <div className="flex w-full flex-col gap-2">
                <Button onClick={() => handleAddTask()}>Add New Task</Button>
                <Button type="button" onClick={() => generateTasks()}>
                  Generate with AI
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
