import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { useMutation } from "@apollo/client";
import { useToast } from "@/hooks/use-toast";
import { ADD_EDUCATION } from "@/lib/mutation";

type Props = {
  closeAddEducationModal: () => void;
};

export default function AddEducationModal({ closeAddEducationModal }: Props) {
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [addEducationMutation, { loading }] = useMutation(ADD_EDUCATION, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const { toast } = useToast();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      await addEducationMutation({
        variables: {
          input: {
            name,
            institute,
            startDate,
            endDate,
          },
        },
      });
      toast({
        title: "Education Added",
        description: "Your education has been added successfully",
      });
      closeAddEducationModal();
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
          onClick={closeAddEducationModal}
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Add Education History
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Education Level
          </label>
          <Input
            id="education"
            name="education"
            placeholder="Education Level"
            type="text"
            inputSize={"small"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Institute
          </label>
          <Input
            id="institute"
            name="institute"
            placeholder="Institute"
            type="text"
            inputSize={"small"}
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
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
            Add Education
          </Button>
        </form>
      </div>
    </div>
  );
}
