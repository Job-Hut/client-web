"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/ui/Navbar";
import { useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

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

  {/* Loading Indicator */}
  {
    loading && <p className="mt-8 text-center text-xl">Loading...</p>;
  }

  {/* Error Message */}
  {
    error && (
      <p className="text-error mt-8 text-center text-xl">{error.message}</p>
    );
  }

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
      <Navbar />

      {/* Main Container with Top Padding */}
      <div className="mb-20 flex w-full flex-col items-center px-4 pb-10 sm:mt-5 sm:max-w-screen-sm md:mt-24">
        {/* Header */}
        <div className="mb-8 mt-6 flex flex-col items-center text-center">
          <h1 className="font-poppins hidden text-3xl font-bold text-primary md:block">
            Edit Collection
          </h1>
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
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full rounded-full bg-primary py-3 font-semibold text-background"
              >
                Save
              </Button>
              <Button
                type="button"
                className="w-full rounded-full bg-secondary py-3 font-semibold text-primary hover:text-background"
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
