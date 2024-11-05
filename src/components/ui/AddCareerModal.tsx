import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { useMutation } from "@apollo/client";
import { ADD_EXPERIENCE } from "@/lib/mutation";
import { useToast } from "@/hooks/use-toast";

type Props = {
  closeAddCareerModal: () => void;
};
export default function AddCareerModal({ closeAddCareerModal }: Props) {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [addCareerMutation, { loading }] = useMutation(ADD_EXPERIENCE, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const { toast } = useToast();

  const handleAddCareer = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      await addCareerMutation({
        variables: {
          input: {
            jobTitle,
            institute: company,
            startDate,
            endDate,
          },
        },
      });
      toast({
        title: "Career Added",
        description: "Your career has been added successfully",
      });
      closeAddCareerModal();
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={closeAddCareerModal}
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Add Career History
        </h2>
        <form onSubmit={handleAddCareer}>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <Input
            id="jobTitle"
            name="jobTitle"
            placeholder="Job Title"
            type="text"
            inputSize={"small"}
            onChange={(e) => setJobTitle(e.target.value)}
            value={jobTitle}
            required
          />

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Company
          </label>
          <Input
            id="company"
            name="company"
            placeholder="Company"
            type="text"
            inputSize={"small"}
            onChange={(e) => setCompany(e.target.value)}
            value={company}
            required
          />

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Duration
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="">Start</label>
              <Input
                id="startDate"
                name="startDate"
                placeholder="Start Date (e.g., Aug 2024)"
                type="date"
                inputSize={"small"}
                className="flex-1"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="">End</label>
              <Input
                id="endDate"
                name="endDate"
                placeholder="End Date (e.g., Nov 2024)"
                type="date"
                inputSize={"small"}
                className="flex-1"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="hover:bg-primary-dark mt-4 w-full rounded-md bg-primary py-2 font-semibold text-white shadow-sm"
            disabled={loading}
          >
            Add Career
          </Button>
        </form>
      </div>
    </div>
  );
}
