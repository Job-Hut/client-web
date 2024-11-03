// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Input } from "@/components/ui/input";

// // Form validation schema
// const FormSchema = z.object({
//   name: z.string().min(2, { message: "Name must be at least 2 characters." }),
//   description: z.string().optional(),
//   visibility: z.enum(["Public", "Private"]),
// });

// export default function CreateCollection() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       visibility: "Public",
//     },
//   });

//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     console.log(data);
//   }

// // ! TODO: input name masi ga consistent styling nya
// // ! TODO: font nya masi belum Poppins

//   // Common class for consistent input styling
//   const inputClassName =
//   "!border-black !rounded-md !focus:border-black !focus:ring-2 !focus:ring-black !focus:outline-none";

//   return (
//     <div className="flex flex-col min-h-screen items-center justify-between p-4">
//       {/* Header */}
//       <div className="flex flex-col items-center justify-center mb-6">
//         <h1 className="text-2xl font-bold text-[#88D1FF]">Create Collection</h1>
//         <p>Let the journey begin</p>
//       </div>

//       {/* Form */}
//       <div className="w-full max-w-md space-y-6">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 ">
//           {/* Name Field */}
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//                 <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Name" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Description Field */}
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Enter collection’s description here..."
//                     {...field}
//                     className={inputClassName}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Visibility Field */}
//           <FormField
//             control={form.control}
//             name="visibility"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Visibility</FormLabel>
//                 <FormControl>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <SelectTrigger className={inputClassName}>
//                       <SelectValue placeholder="Select visibility" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Public">Public</SelectItem>
//                       <SelectItem value="Private">Private</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Save Button */}
//           <Button
//             type="submit"
//             className="w-full bg-[#88D1FF] text-primary font-semibold rounded-full py-2 mb-10"
//           >
//             Save
//           </Button>
//         </form>
//       </Form>
//       </div>
//     </div>
//   );
// }

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

import { Input } from "@/components/ui/input";

// Form validation schema
const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().optional(),
  visibility: z.enum(["Public", "Private"]),
});

export default function CreateCollection() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      visibility: "Public",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  // Common class for consistent input styling
  const inputClassName =
    "border border-black rounded-lg px-4 py-2 focus:border-black focus:ring-2 focus:ring-black focus:outline-none";

  return (
    <div className="flex flex-col min-h-screen items-center p-4">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-[#88D1FF] font-poppins">Create Collection</h1>
        <p className="text-gray-500 font-poppins">Let the new journey begin</p>
      </div>

      {/* Form */}
      <div className="w-full max-w-md space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-[10%]">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-poppins text-lg">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
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
                  <FormLabel className="font-poppins text-lg">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter collection’s description here..."
                      {...field}
                      className={inputClassName}
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
                  <FormLabel className="font-poppins text-lg">Visibility</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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

            {/* Save Button */}
            <Button
              type="submit"
              className="w-full bg-[#88D1FF] text-primary font-semibold rounded-full py-3 mt-6"
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
