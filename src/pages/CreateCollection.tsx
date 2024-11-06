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
        ownerId
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
    <div className="relative flex min-h-screen flex-col items-center bg-secondary">
      <Navbar />
      <div className="font-poppins fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-primary p-4 text-background shadow-md">
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
      <div className="mb-20 flex w-full flex-col items-center px-4 pb-10 sm:mt-5 sm:max-w-screen-sm md:mt-24">
        {/* Header */}
        <div className="mb-8 mt-6 flex flex-col items-center text-center">
          <h1 className="font-poppins text-3xl font-bold text-primary">
            Create Collection
          </h1>
          <p className="font-poppins text-primary">Let the new journey begin</p>
        </div>

        {/* Form */}
        <div className="w-full rounded-lg bg-background p-6 shadow-md">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name field */}
            <Input
              id="name"
              placeholder="Name"
              type="text"
              inputSize={"small"}
              {...form.register("name")}
            />
            {/* Description Field */}
            <Textarea
              id="description"
              placeholder="Description"
              className="border-primary"
              {...form.register("description")}
            />

            {/* Save and Cancel Buttons */}
            <div className="flex flex-col gap-2 md:flex-row md:gap-2">
              <Button
                type="submit"
                className="w-full bg-primary py-3 font-semibold text-background"
                onClick={form.handleSubmit(onSubmit)}
              >
                Save
              </Button>
              <Button
                type="button"
                className="w-full bg-secondary py-3 font-semibold text-primary hover:text-background"
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
