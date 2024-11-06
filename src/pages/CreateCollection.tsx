import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/ui/Navbar";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

// Form validation schema
const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().optional(),
});

export default function CreateCollection() {
  // Mutation to create a collection
  const [createCollection] = useMutation(gql`
    mutation CreateCollection($input: CollectionInput) {
      createCollection(input: $input) {
        _id
        name
        description
        createdAt
        updatedAt
      }
    }
  `);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    try {
      // Call the mutation to create a collection

      await createCollection({
        variables: {
          input: {
            name: data.name,
            description: data.description,
          },
        },
      });

      toast({
        title: "Success",
        description: "Collection created successfully",
      });

      navigate("/collections");
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/collections");
  };

  return (
    <div className="flex min-h-screen flex-col gap-2 bg-secondary">
      {/* <Navbar /> */}
      <div className="flex w-full items-center justify-between bg-black p-4 text-background md:justify-center">
        <button
          className="text-lg"
          aria-label="Go back"
          onClick={() => navigate(`/collections`)}
        >
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
            className="lucide lucide-circle-arrow-left"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 12H8" />
            <path d="m12 8-4 4 4 4" />
          </svg>
        </button>

        <h2 className="absolute left-1/2 -translate-x-1/2 transform text-base font-semibold sm:text-lg">
          Create Collection
        </h2>
      </div>

      {/* Main Container with Top Padding */}
      <div className="flex w-full flex-col items-center px-4 pb-10 sm:max-w-screen-sm">
        {/* Form */}
        <div className="mt-4 w-full space-y-5 rounded-md bg-background px-4 py-5 shadow-md">
          <h2 className="border-b-2 border-primary pb-5 text-center text-lg font-bold">
            Create New Collection
          </h2>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* Name field */}
            <div className="flex flex-col">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name"
                type="text"
                inputSize={"small"}
                {...form.register("name")}
              />
            </div>

            {/* Description Field */}
            <div className="flex flex-col">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Description"
                className="border-primary"
                {...form.register("description")}
              />
            </div>

            {/* Save and Cancel Buttons */}
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full rounded-md bg-primary py-3 font-medium text-background"
                onClick={form.handleSubmit(onSubmit)}
              >
                Save
              </Button>
              <Button
                type="button"
                className="w-full rounded-md bg-secondary gap-2 font-semibold text-primary hover:text-background"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
