export default function ApplicationCard() {
  return (
    <div className="flex flex-col justify-between gap-2.5 rounded-lg bg-card p-2 shadow-md">
      <div className="flex w-full items-center justify-between gap-2.5 rounded-lg bg-application-submitted p-4 md:flex-col md:items-start">
        <span
          className={`hidden h-fit w-fit rounded-full bg-card px-4 py-2.5 text-sm font-bold text-red-500 md:block`}
        >
          Due Today
        </span>
        <div>
          <p className="text-sm">Tokopedia</p>
          <p className="text-lg font-bold">Backend Developer</p>
        </div>
        <span
          className={`h-fit w-fit rounded-full bg-card px-4 py-2.5 text-sm font-bold text-red-500 md:hidden`}
        >
          Due Today
        </span>
      </div>
      <div className="px-4">
        <p className="text-sm">Task Todo:</p>
        <div className="flex items-baseline justify-between">
          <span className="font-semibold">Create CV</span>
          <span className="text-sm font-semibold">23/10/24</span>
        </div>
      </div>
    </div>
  );
}
