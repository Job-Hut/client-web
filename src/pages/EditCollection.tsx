"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Label } from "@radix-ui/react-label";

// Form validation schema
const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().optional(),
});

const GET_COLLECTION_BY_ID = gql`
  query GetCollectionById($id: ID!) {
    getCollectionById(id: $id) {
      _id
      name
      description
    }
  }
`;

const UPDATE_COLLECTION = gql`
  mutation UpdateCollection($id: ID!, $input: CollectionInput) {
    updateCollection(id: $id, input: $input) {
      _id
      description
      name
    }
  }
`;

export default function EditCollection() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_COLLECTION_BY_ID, {
    variables: { id: _id },
  });

  const [updateCollection] = useMutation(UPDATE_COLLECTION);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.getCollectionById.name,
        description: data.getCollectionById.description,
      });
    }
  }, [data, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // Call the mutation to edit a collection
      await updateCollection({
        variables: {
          id: _id,
          input: {
            name: data.name,
            description: data.description,
          },
        },
      });

      toast({
        title: "Success",
        description: "Collection edited successfully",
      });

      navigate(`/collections/${_id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  const handleCancel = () => {
    navigate(`/collections/${_id}`);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-secondary">
      {/* Navbar */}
      <div className="flex w-full items-center justify-between bg-black p-4 text-background md:justify-center">
        <button
          className="text-lg"
          aria-label="Go back"
          onClick={() => navigate(`/collections/${_id}`)}
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
          Edit Collection
        </h2>
      </div>
      {loading && <p className="mt-8 text-center text-xl">Loading...</p>}
      {error && (
        <p className="text-error mt-8 text-center text-xl">{error.message}</p>
      )}

      {/* Main Container with Top Padding */}
      {data?.getCollectionById && (
        <div className="flex w-full flex-col items-center px-4 pb-10 sm:max-w-screen-sm md:mt-24">
          {/* Form */}
          <div className="mt-4 w-full rounded-lg bg-background px-4 py-5 shadow-md">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <h2 className="border-b-2 border-primary pb-5 text-center text-lg font-bold">
                Edit Collection
              </h2>
              {/* Name field */}
              <div className="flex flex-col">
                <Label className="text-md font-medium">Name</Label>
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
                <Label>Description</Label>
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
                  className="w-full rounded-md bg-primary py-3 font-semibold text-background"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  className="w-full rounded-md bg-secondary py-3 font-semibold text-primary hover:text-background"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
