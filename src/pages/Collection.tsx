import BottomNavigation from "@/components/ui/BottomNavigation";
import { Button } from "@/components/ui/button";
import CollectionList from "@/components/ui/CollectionList";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Collection() {
  const navigate = useNavigate();

  const handleCreateCollection = () => {
    navigate("/create-collection");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-secondary">
      <Navbar />

      <form className="mx-auto mt-4 flex w-11/12 gap-2 md:pt-24">
        <Input
          type="text"
          placeholder="Search job preference"
          className="w-full"
        />
        <Button>
          <Search color="white" width={16} />
        </Button>
      </form>
      {/* Main Button */}
      <Button
        className="mx-auto mt-6 w-11/12 sm:max-w-screen-sm"
        onClick={handleCreateCollection}
      >
        New Collection
      </Button>

      {/* CollectionList Grid */}
      <div className="mt-6 flex w-11/12 flex-col gap-4 pb-48 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 md:pb-20 md:pt-20 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        <CollectionList className={cn("bg-collection-1")} />
        <CollectionList className={cn("bg-collection-2")} />
        <CollectionList className={cn("bg-collection-3")} />
        {/* Additional CollectionList items for testing */}
      </div>
      <BottomNavigation />
    </div>
  );
}
