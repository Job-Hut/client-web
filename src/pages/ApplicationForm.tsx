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
import { CircleArrowLeft, EllipsisVertical } from "lucide-react";

export default function ApplicationForm() {
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
            Edit Your Application
          </h2>
          <form className="flex flex-col gap-3">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Enter company name"
                type="text"
                inputSize={"small"}
              />
            </div>
            <div>
              <Label htmlFor="positionName">Position Name</Label>
              <Input
                id="positionName"
                placeholder="Enter job position"
                type="text"
                inputSize={"small"}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="collection">Collection</Label>
              <Select>
                <SelectTrigger id="collection">
                  <SelectValue placeholder="Choose collection" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="collection1">Collection 1</SelectItem>
                  <SelectItem value="collection2">Collection 2</SelectItem>
                  <SelectItem value="collection3">Collection 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="workModel">Work Model</Label>
              <Select>
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
              <Label htmlFor="salaryRange">Salary Range</Label>
              <Input
                id="salaryRange"
                placeholder="Enter salary range"
                type="text"
                inputSize={"small"}
              />
            </div>
            <div>
              <Label htmlFor="companyLocation">Company Location</Label>

              <Input
                id="companyLocation"
                placeholder="Enter company location"
                type="text"
                inputSize={"small"}
              />
            </div>
            <Button className="mt-4">Save Application</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
