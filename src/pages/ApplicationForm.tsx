import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CircleArrowLeft, EllipsisVertical } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Application, Collection } from "@/lib/types";

export default function ApplicationForm() {
  const location = useLocation();
  const { application }: { application: Application } = location.state || {};
  // console.log(application);
  const paths = location.pathname.split("/");
  let title;
  if (paths.includes("create")) title = "Create New Application";

  const [input, setInput] = useState({
    source: application?.source || "",
    companyName: application?.organizationName || "",
    positionName: application?.jobTitle || "",
    jobDescription: application?.description || "",
    collection: application?.collectionId || "",
    type: application?.type || "",
    salary: application?.salary.toString() || "",
    companyLocation: application?.location || "",
    companyLogo: application?.organizationLogo || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const { toast } = useToast();

  const [createApplicationMutation, { loading }] = useMutation(gql`
    mutation Mutation($input: ApplicationInput) {
      createApplication(input: $input) {
        _id
        jobTitle
        organizationName
      }
    }
  `);

  const [updateApplicationMutation] = useMutation(gql`
    mutation Mutation($id: ID!, $input: ApplicationInput) {
      updateApplication(_id: $id, input: $input) {
        _id
        jobTitle
        organizationName
      }
    }
  `);

  const { data } = useQuery(gql`
    query GetAllCollection {
      getAllCollection {
        _id
        name
      }
    }
  `);

  const nav = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const application = {
        jobTitle: input.positionName,
        description: input.jobDescription,
        organizationName: input.companyName,
        organizationLogo: input.companyLogo,
        location: input.companyLocation,
        salary: Number(input.salary),
        type: input.type,
        collectionId: !input.collection ? null : input.collection,
      };

      if (paths.includes("create"))
        await createApplicationMutation({ variables: { input: application } });
      else
        await updateApplicationMutation({
          variables: { id: paths[2], input: application },
        });

      nav("/applications");
    } catch (err: unknown) {
      toast({
        title: "Error",
        description: (err as Error).message,
        variant: "destructive",
      });
      // handle error
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-2 bg-secondary pb-10">
      <div className="flex w-full items-center justify-between bg-black p-4 text-background">
        <button title="Go back to previous page" aria-label="Go back">
          <CircleArrowLeft />
        </button>
        <h2 className="font-semibold">Application Form</h2>
        <button title="Additional options" aria-label="More options">
          <EllipsisVertical />
        </button>
      </div>
      <div className="mx-auto flex w-11/12 flex-col gap-4 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 md:pb-20 md:pt-20 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        <div className="mt-4 space-y-5 rounded-md bg-background px-4 py-5 shadow-md">
          <h2 className="border-b-2 border-primary pb-5 text-center text-lg font-bold">
            {title ? title : "Edit Your Application"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Enter company name"
                type="text"
                inputSize={"small"}
                value={input.companyName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="positionName">Position Name</Label>
              <Input
                id="positionName"
                name="positionName"
                placeholder="Enter job position"
                type="text"
                inputSize={"small"}
                value={input.positionName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Enter job description"
                className="border border-primary text-xs placeholder:text-xs"
                value={input.jobDescription}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="collection">Collection</Label>
              <Select
                name="collection"
                value={input.collection}
                onValueChange={(value) =>
                  setInput({ ...input, collection: value })
                }
              >
                <SelectTrigger id="collection">
                  <SelectValue placeholder="Choose collection" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {data?.getAllCollection.length !== 0 ? (
                    data?.getAllCollection?.map((collection: Collection) => (
                      <SelectItem value={collection._id} key={collection._id}>
                        {collection.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="-">No collection</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="workModel">Work Model</Label>
              <Select
                name="type"
                value={input.type}
                onValueChange={(value) => setInput({ ...input, type: value })}
              >
                <SelectTrigger id="workModel">
                  <SelectValue placeholder="Choose work model" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="onsite">Onsite</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="salaryRange">Expected Salary</Label>
              <Input
                id="salary"
                name="salary"
                placeholder="Enter salary range"
                type="text"
                inputSize={"small"}
                value={input.salary}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="companyLocation">Company Location</Label>
              <Input
                id="companyLocation"
                name="companyLocation"
                placeholder="Enter company location"
                type="text"
                inputSize={"small"}
                value={input.companyLocation}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="companyLogo">Company Logo</Label>
              <Input
                id="companyLogo"
                name="companyLogo"
                placeholder="Enter company logo url"
                type="text"
                inputSize={"small"}
                value={input.companyLogo}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                name="source"
                placeholder="Enter job vacancy source"
                type="text"
                inputSize={"small"}
                value={input.source}
                onChange={handleChange}
              />
            </div>
            <Button className="mt-4" disabled={loading}>
              Save Application
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
