import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { useMutation } from "@apollo/client";
import { ADD_LICENSE } from "@/lib/mutation";
import { XIcon } from "lucide-react";

type Props = {
  closeAddLicenseModal: () => void;
};

export default function AddLicenseModal({ closeAddLicenseModal }: Props) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [issuedAt, setIssuedAt] = useState("");
  const [expiredDate, setExpiredDate] = useState("");

  const [addLicenseMutation, { loading }] = useMutation(ADD_LICENSE, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleAddLicense = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      await addLicenseMutation({
        variables: {
          input: {
            number,
            name,
            issuedBy,
            issuedAt,
            expiryDate: expiredDate,
          },
        },
      });
      closeAddLicenseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <Button
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
          onClick={closeAddLicenseModal}
          variant="outline"
        >
          <XIcon size={16} />
        </Button>

        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Add License / Certification
        </h2>
        <form onSubmit={handleAddLicense}>
          <div className="space-y-2">
            <div className="my-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Certification Number
              </label>
              <Input
                id="license"
                name="license"
                placeholder="Number"
                type="text"
                inputSize={"small"}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                License / Certification Name
              </label>
              <Input
                id="license"
                name="license"
                placeholder="License / Certification Name"
                type="text"
                inputSize={"small"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="my-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Issuing Organization
              </label>
              <Input
                id="organization"
                name="organization"
                placeholder="Issuing Organization Name"
                type="text"
                inputSize={"small"}
                value={issuedBy}
                onChange={(e) => setIssuedBy(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Validity
                <div className="mt-1 flex gap-2">
                  <div className="flex-1">
                    <label htmlFor="" className="text-xs">
                      Start
                    </label>
                    <Input
                      id="startDate"
                      name="startDate"
                      placeholder="Start Date (e.g., Aug 2024)"
                      type="date"
                      inputSize={"small"}
                      className="flex-1"
                      value={issuedAt}
                      onChange={(e) => setIssuedAt(e.target.value)}
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
                      className="flex-1 text-xs"
                      value={expiredDate}
                      onChange={(e) => setExpiredDate(e.target.value)}
                    />
                  </div>
                </div>
              </label>
            </div>
          </div>
          <Button
            className="hover:bg-primary-dark mt-4 w-full rounded-md bg-primary py-2 font-semibold text-white shadow-sm"
            disabled={loading}
          >
            Add License / Certification
          </Button>
        </form>
      </div>
    </div>
  );
}
