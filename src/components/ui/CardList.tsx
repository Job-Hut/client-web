import ApplicationCard from "./ApplicationCard";

export default function CardList() {
  return (
    <div className="mt-6 flex w-11/12 flex-col gap-4 pb-28 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 md:pb-20 md:pt-20 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
      <ApplicationCard />
      <ApplicationCard />
      <ApplicationCard />
      <ApplicationCard />
    </div>
  );
}
