import { Application } from "@/lib/types";
import ApplicationCard from "./ApplicationCard";

type Props = {
  applications: Application[];
};

export default function CardList({ applications }: Props) {
  return (
    <div className="mt-6 flex w-11/12 flex-col gap-4 pb-48 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 md:pb-20 md:pt-20 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
      {applications.map((application: Application, iter: number) => (
        <ApplicationCard
          key={`${application.jobTitle}-${iter}`}
          application={application}
        />
      ))}
    </div>
  );
}
