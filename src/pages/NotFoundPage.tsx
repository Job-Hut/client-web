import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center gap-4">
      <Flag fill="black" />
      <div className="text-4xl font-bold">Error 404</div>
      <div className="flex flex-col items-center">
        <div>You lost? No worries!</div>
        <div>Click the button below to go back!</div>
      </div>
      <Link to="/">
        <Button>Let's go</Button>
      </Link>
    </div>
  );
}
