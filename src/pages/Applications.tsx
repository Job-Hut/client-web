import { Link2, MapPin, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";

import BottomNavigation from "@/components/ui/BottomNavigation";

import { gql, useQuery } from "@apollo/client";
import { Application } from "@/lib/types";

export default function Applications() {
  const { data, loading, error } = useQuery(gql`
    query GetAllApplication {
      getAllApplication {
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
      }
    }
  `);

  return (
    <div className="flex min-h-screen flex-col bg-secondary pb-10">
      <Navbar />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center">Error: {error.message} </p>}
      <div className="mx-auto flex w-11/12 flex-col gap-4 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 md:pb-20 md:pt-20 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        {data?.getAllApplication?.map(
          (application: Application, iter: number) => (
            <Link
              to={`/applications/${application._id}`}
              key={`${application.jobTitle}-${iter}`}
            >
              <div className="flex flex-col justify-between gap-2.5 rounded-lg bg-card p-2 shadow-md">
                <div className="flex w-full flex-col items-start justify-between gap-4 rounded-lg bg-application-submitted p-4">
                  <div className="flex items-center gap-3">
                    {
                      <img
                        className="h-8 w-8 rounded-full bg-[#FF5A5F] object-cover"
                        src={application.organizationLogo}
                        alt=""
                      />
                    }
                    <div>
                      <p className="text-sm">{application.organizationName}</p>
                      <p className="text-sm font-bold">
                        {application.jobTitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pl-4">
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <Wallet width={16} />
                      <p>
                        {application.salary
                          ? application.salary
                          : "Not specified"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin width={16} />
                      <p>
                        {application.location
                          ? application.location
                          : "Not specified"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link2 width={16} />
                      <a href="google.com" className="text-blue-500">
                        www.jobstreet.com
                      </a>
                    </div>
                  </div>
                  <Link to={`/applications/:id/edit`}>
                    <Button>Edit</Button>
                  </Link>
                </div>
              </div>
            </Link>
          ),
        )}
      </div>
      <BottomNavigation />
    </div>
  );
}
