import { LinkIcon, MapPin, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
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
        source
        startDate
        endDate
        createdAt
        updatedAt
      }
    }
  `);

  const { pathname: fromPage } = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-secondary pb-24">
      <Navbar />

      {data?.getAllApplication?.length == 0 && (
        <p className="mt-8 text-center">
          You have no applications at this moment
        </p>
      )}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center">Error: {error.message} </p>}
      <div className="mx-auto mt-4 flex w-11/12 flex-col gap-4 pb-20 md:mt-8 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 md:pb-20 md:pt-20 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        {data?.getAllApplication?.map(
          (application: Application, iter: number) => (
            // <Link
            //   to={`/applications/${application._id}`}
            //   key={`${application.jobTitle}-${iter}`}
            // >
            <div
              key={`${application.jobTitle}-${iter}`}
              className="flex flex-col justify-between gap-2.5 rounded-lg bg-card p-2 shadow-md"
            >
              <Link
                to={`/applications/${application._id}`}
                state={{ fromPage }}
                className="flex w-full flex-col items-start justify-between gap-4 rounded-lg bg-application-submitted p-4 hover:bg-application-submitted/85"
              >
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
                    <p className="line-clamp-1 text-sm font-bold">
                      {application.jobTitle}
                    </p>
                  </div>
                </div>
              </Link>
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
                    <LinkIcon width={16} />
                    <a
                      href={application.source ? application.source : "#"}
                      className="text-blue-500"
                      target="_blank"
                    >
                      Source
                    </a>
                  </div>
                </div>
                <Link
                  to={`/applications/${application._id}/edit`}
                  state={{ application, fromPage }}
                >
                  <Button>Edit</Button>
                </Link>
              </div>
            </div>
            // </Link>
          ),
        )}
      </div>
      <BottomNavigation />
    </div>
  );
}
