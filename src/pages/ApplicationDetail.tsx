import {
  CircleArrowLeft,
  EllipsisVertical,
  FolderOpen,
  MapPin,
  Wallet,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/ui/TaskCard";
import ApplicationStatus from "@/components/ui/ApplicationStatus";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { formattedCurrency } from "@/utils/helper";

const applicationStages = [
  {
    value: "submitted",
    label: "Submitted",
  },
  {
    value: "interview",
    label: "Interview",
  },
  {
    value: "offerLetter",
    label: "Offer Letter",
  },
  {
    value: "success",
    label: "Success",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];

export default function ApplicationDetail() {
  const { _id } = useParams();

  const stageState = useState("submitted");

  const { data } = useQuery(
    gql`
      query GetApplicationById($id: ID!) {
        getApplicationById(_id: $id) {
          _id
          ownerId
          collectionId
          jobTitle
          description
          organizationName
          organizationAddress
          organizationLogo
          location
          salary
          type
          startDate
          endDate
          createdAt
          updatedAt
          tasks {
            _id
            title
            description
            completed
            dueDate
            stage
            createdAt
            updatedAt
          }
        }
      }
    `,
    { variables: { id: _id } },
  );

  return (
    <div className="flex min-h-screen flex-col gap-2 bg-secondary pb-10">
      <div className="flex w-full items-center justify-between bg-black p-4 text-background">
        <button title="Go back to previous page" aria-label="Go back">
          <CircleArrowLeft />
        </button>
        <h2 className="font-semibold">Application Detail</h2>
        <button title="Additional options" aria-label="More options">
          <EllipsisVertical />
        </button>
      </div>
      <div className="mx-auto flex w-11/12 flex-col gap-4 md:max-w-screen-xl md:gap-4 md:pb-20 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/applications">
                  <FolderOpen width={15} className="md:w-8" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{_id}1</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="flex flex-col justify-between gap-2.5 rounded-lg bg-card p-2 shadow-md lg:w-1/2">
            <div className="flex w-full flex-col items-start justify-between gap-4 rounded-lg bg-application-submitted p-4">
              <ApplicationStatus
                applicationStages={applicationStages}
                stageState={stageState}
              />
              <div className="flex items-center gap-3">
                <img
                  className="h-8 w-8 rounded-full bg-[#FF5A5F] object-cover"
                  src={data?.getApplicationById?.organizationLogo}
                  alt=""
                />
                <div>
                  <p className="text-sm">
                    {data?.getApplicationById?.organizationName}
                  </p>
                  <p className="text-sm font-bold">Backend Developer</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pl-4">
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <Wallet width={16} />
                  <p>{formattedCurrency(data?.getApplicationById?.salary) || "Not Specified"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin width={16} />
                  <p>{data?.getApplicationById?.location || "Not Specified"}</p>
                </div>
                <p className="mt-6">
                  {data?.getApplicationById?.description || "No description"}
                </p>
              </div>
              <Link to={`/applications/:id/edit`}>
                <Button>Edit</Button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <TaskCard
            className="lg:w-full"
            tasks={data?.getApplicationById?.tasks}
            applicationId={_id}
            applicationStage={stageState[0]}
          />
        </div>
      </div>
    </div>
  );
}
