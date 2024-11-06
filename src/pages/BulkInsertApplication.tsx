import { Button } from "@/components/ui/button";
import InsertApplicationCard from "@/components/ui/InsertApplicationCard";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";
import { useMutation, useQuery } from "@apollo/client";
import { GET_APPLICATIONS, GET_COLLECTION_DETAIL } from "@/lib/queries";
import { Application } from "@/lib/types";
import { useState } from "react";
import { ADD_APPLICATIONS_TO_COLLECTION } from "@/lib/mutation";

export default function BulkInsertApplication() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<Application[]>([]);

  const { _id } = useParams();

  const [addApplicationsToCollection, { loading: saveLoading }] = useMutation(
    ADD_APPLICATIONS_TO_COLLECTION,
  );

  const addToApplications = (application: Application) => {
    setApplications([...applications, application]);
  };

  const removeFromApplications = (application: Application) => {
    setApplications(applications.filter((app) => app._id !== application._id));
  };

  const { data, loading } = useQuery(GET_APPLICATIONS);

  const handleSave = async () => {
    try {
      await addApplicationsToCollection({
        variables: {
          collectionId: _id,
          applicationIds: applications.map((app) => app._id),
        },
        refetchQueries: [
          {
            query: GET_COLLECTION_DETAIL,
            variables: { _id },
          },
        ],
      });
      navigate(`/collections/${_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-secondary">
      {/* Navbar */}
      <div className="font-poppins fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-primary p-4 font-medium text-background shadow-md">
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
          Insert Application(s)
        </h2>
      </div>

      <div className="mx-auto mt-6 flex w-11/12 flex-col gap-4 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 md:pt-20 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        {data?.getAllApplication
          .filter((application: Application) => {
            return !application.collectionId;
          })
          .map((application: Application) => (
            <InsertApplicationCard
              key={application._id}
              application={application}
              addToApplications={addToApplications}
              removeFromApplications={removeFromApplications}
            />
          )).length == 0 && (
          <div className="flex h-full w-full items-center justify-center">
            <p className="mt-16 text-lg font-semibold">
              You have not make any application yet
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 flex w-11/12 flex-col gap-4 pb-10 md:mt-28 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.getAllApplication
            .filter((application: Application) => {
              return !application.collectionId;
            })
            .map((application: Application) => (
              <InsertApplicationCard
                key={application._id}
                application={application}
                addToApplications={addToApplications}
                removeFromApplications={removeFromApplications}
              />
            ))
        )}
      </div>
      <Button
        className="mb-20 w-11/12 max-w-sm rounded-md"
        disabled={saveLoading}
        onClick={() => handleSave()}
      >
        Save
      </Button>
    </div>
  );
}
