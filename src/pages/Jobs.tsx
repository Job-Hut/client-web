import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";

import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { Job } from "@/lib/types";

import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/ui/BottomNavigation";
import { Search } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("msuk");
  };

  return (
    <div className="flex min-h-screen flex-col bg-secondary pb-10">
      <Navbar />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mx-auto mt-4 flex w-11/12 max-w-screen-xl gap-2 px-10 md:pt-24"
      >
        <Input
          type="text"
          placeholder="Search job preference"
          className="w-full"
        />
        <Button>
          <Search color="white" width={16} />
        </Button>
      </form>

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
            </div>
          ))}
      </div>
      <BottomNavigation />
    </div>
  );
}
