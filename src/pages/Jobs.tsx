import { Link2, MapPin, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Job } from "@/lib/types";

export default function Jobs() {
  const [page, setPage] = useState(1);

  const [jobsQuery, { data, loading, error }] = useLazyQuery(gql`
    query GetJobs {
      getJobs(page: 1, query: "") {
        title
        company
        companyLogo
        location
        description
        salary
        source
        sourceUrl
        since
      }
    }
  `);

  return (
    <div className="flex min-h-screen flex-col gap-2 bg-secondary pb-10">
      <div className="flex w-full items-center justify-center bg-black p-4 text-background">
        <h2 className="font-semibold">Jobs List</h2>
      </div>
      <Navbar />

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center">Error: {error.message} </p>}

      <div className="mx-auto flex w-11/12 flex-col gap-4 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 md:pb-20 md:pt-20 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        {data &&
          data?.getJobs?.map((job: Job, iter: number) => (
            <div
              className="flex flex-col justify-between gap-5 rounded-lg bg-card p-2 shadow-md"
              key={`${job.title}-${iter}`}
            >
              <div className="flex w-full flex-col items-start justify-between gap-4 rounded-lg p-4 pb-0">
                <div className="flex items-start items-center gap-3">
                  <div>
                    <img
                      className="h-8 w-8 rounded-full bg-[#FF5A5F] object-cover"
                      src={job.companyLogo}
                    />
                  </div>

                  <div>
                    <p className="text-sm">{job.company}</p>
                    <p className="text-sm font-bold">{job.title}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between pl-4">
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <Wallet width={16} />
                      <p>{job.salary || "Not specified"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin width={16} />
                      <p>{job.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link2 width={16} />
                      <a
                        href={job.sourceUrl}
                        className="text-blue-500"
                        target="_blank"
                      >
                        {job.source}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <Button aria-label="add to application">
                Add to application
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
