import { Button } from "@/components/ui/button";
import CollectionList from "@/components/ui/CollectionList";
import Navbar from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";

export default function Collection() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-secondary">
      <Navbar />

      {/* Main Button */}
      <Button className="mt-6 w-11/12 mx-auto sm:max-w-screen-sm">
        New Collection
      </Button>

      {/* CollectionList Grid */}
      <div className="mt-6 flex w-11/12 flex-col gap-4 pb-48 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 md:pb-20 md:pt-20 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        <CollectionList className={cn("bg-collection-1")} />
        <CollectionList className={cn("bg-collection-2")} />
        <CollectionList className={cn("bg-collection-3")} />
        {/* Additional CollectionList items for testing */}
      </div>
    </div>
  );
}
