"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Navbar from "@/components/ui/Navbar";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { gql, useMutation } from "@apollo/client";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().optional(),
  visibility: z.enum(["Public", "Private"]),
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
      visibility: "Public",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
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

  const inputClassName =
    "border border-black rounded-lg px-4 py-2 focus:border-black focus:ring-2 focus:ring-black focus:outline-none placeholder-gray-400 placeholder-opacity-75";

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/collections");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-secondary">
      <div className="sticky top-0 z-10 w-full">
        <Navbar />
      </div>
      {/* Main Container with Top Padding */}
      <div className="flex w-full flex-col items-center px-4 pb-10 msm:mb-40 sm:mb-38 sm:mt-5 sm:max-w-screen-sm md:mt-24">
        {/* Header */}
        <div className="mb-8 mt-6 flex flex-col items-center text-center">
          <h1 className="font-poppins text-3xl font-bold text-[#88D1FF]">
            Create Collection
          </h1>
          <p className="font-poppins text-primary">Let the new journey begin</p>
        </div>

        {/* Form */}
        <div className="w-full rounded-lg bg-background p-6 shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* If I use the Input component somehow the styling cannot be overridden */}
              {/* Name field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-poppins text-lg">Name</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Name"
                        {...field}
                        className={cn("!h-[40px]", inputClassName)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-poppins text-lg">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter collection’s description here..."
                        {...field}
                        className={cn("h-40", inputClassName)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Visibility Field */}
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-poppins text-lg">
                      Visibility
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className={inputClassName}>
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Public">Public</SelectItem>
                          <SelectItem value="Private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Save and Cancel Buttons */}
              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full rounded-full bg-[#88D1FF] py-3 font-semibold text-primary"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  className="w-full rounded-full bg-secondary py-3 font-semibold text-primary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
