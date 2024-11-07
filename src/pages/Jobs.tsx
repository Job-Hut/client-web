import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";

import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Job } from "@/lib/types";

import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/ui/BottomNavigation";
import { DollarSign, LinkIcon, MapPinnedIcon, Search } from "lucide-react";
import { GET_AUTHENTICATED_USER, GET_JOBS } from "@/lib/queries";
import { Link, useLocation } from "react-router-dom";

export default function Jobs() {
  const [page] = useState(1);
  const [query, setQuery] = useState("");

  const { data: userData } = useQuery(GET_AUTHENTICATED_USER);

  const [jobsQuery, { data, loading, error }] = useLazyQuery(GET_JOBS);

  useEffect(() => {
    if (userData) {
      setQuery(userData.getAuthenticatedUser.profile.jobPrefs.join(" "));
      jobsQuery({
        variables: {
          page: page,
          query: userData.getAuthenticatedUser.profile.jobPrefs.join(" "),
        },
      });
    }
  }, [userData]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    jobsQuery({
      variables: {
        page: page,
        query: query,
      },
    });
  };

  const { pathname: fromPage } = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-secondary pb-10">
      <Navbar />

      <div className="mx-auto mt-4 flex w-11/12 max-w-screen-xl gap-2 md:pt-24 xl:px-10">
        <form onSubmit={(e) => handleSubmit(e)} className="flex w-full gap-x-4">
          <Input
            type="text"
            placeholder="Search job preference"
            className="w-full"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button>
            <Search color="white" width={16} />
          </Button>
        </form>
      </div>

      {loading && <p className="mt-8 text-center">Loading...</p>}
      {error && <p className="mt-8 text-center">Error: {error.message} </p>}

      <div className="mx-auto mt-8 flex w-11/12 flex-col gap-4 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 md:pb-20 lg:grid-cols-3 xl:px-10">
        {data &&
          data?.getJobs?.map((job: Job, iter: number) => (
            <div
              className="flex flex-col justify-between gap-5 rounded-lg bg-card p-6 shadow-md"
              key={`${job.title}-${iter}`}
            >
              <div className="flex w-full flex-col items-start justify-between gap-4 rounded-lg pb-0">
                <div className="flex min-h-[6ch] w-full items-center gap-6">
                  <div>
                    <img
                      className="h-8 w-8 rounded-full bg-[#FF5A5F] object-cover"
                      src={job.companyLogo}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{job.company}</p>
                    <p className="line-clamp-1 text-sm">{job.title}</p>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center gap-x-2">
                    <MapPinnedIcon size={14} />
                    <p className="text-sm">{job.location}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2">
                    <DollarSign size={14} />
                    <p className="text-sm">{job.salary || "Not Specified"}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2">
                    <LinkIcon size={14} />
                    <a className="text-sm underline" href={job.sourceUrl}>
                      {job.source || "Not Specified"}
                    </a>
                  </div>
                  <Link
                    to={`/applications/create`}
                    state={{ job, fromPage }}
                    className="flex w-full justify-end"
                  >
                    <Button className="mt-6">Create Application</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      <BottomNavigation />
    </div>
  );
}
