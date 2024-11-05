import { Button } from "@/components/ui/button";
import InsertApplicationCard from "@/components/ui/InsertApplicationCard";
import { useNavigate } from "react-router-dom";

export default function BulkInsertApplication() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-secondary">
        {/* Navbar */}
      <div className="font-poppins fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-primary p-4 text-background shadow-md">
        <button
          className="text-lg"
          aria-label="Go back"
          onClick={() => navigate("/collections/:_id")}
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

      <div className="mt-20 flex w-11/12 flex-col gap-4 pb-10 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        <InsertApplicationCard />
      </div>
      <Button className="rounded-full mb-20 w-11/12 max-w-sm">Insert</Button>
    </div>
  );
}
