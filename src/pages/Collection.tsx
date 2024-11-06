import BottomNavigation from "@/components/ui/BottomNavigation";
import { Button } from "@/components/ui/button";
import CollectionList from "@/components/ui/CollectionList";
import Navbar from "@/components/ui/Navbar";
import type { Collection } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Plus } from "lucide-react";

import { gql, useQuery } from "@apollo/client";

import { useNavigate } from "react-router-dom";

export default function Collection() {
  const navigate = useNavigate();

  // list collection dari back end
  const { data, loading, error } = useQuery(gql`
    query GetAllCollection {
      getAllCollection {
        _id
        name
        description
        createdAt
        updatedAt
        applications {
          _id
        }
      }
    }
  `);

  const handleCreateCollection = () => {
    navigate("/create-collection");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-secondary">
      <Navbar />

      {/* Loading Indicator */}
      {loading && <p className="mt-8 text-center text-xl">Loading...</p>}

      {/* Error Message */}
      {error && (
        <p className="text-error mt-8 text-center text-xl">{error.message}</p>
      )}

      {data?.getallCollection?.length == 0 && (
        <p className="mt-8 text-center">
          You have no applications at this moment
        </p>
      )}

      {/* CollectionList Grid */}
      <div className="mx-auto mt-6 flex w-11/12 flex-col gap-4 md:grid md:max-w-screen-xl md:grid-cols-2 md:gap-4 md:pt-20 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        {/* Display the Collections */}
        {data?.getAllCollection?.map((collection: Collection, iter: number) => (
          <CollectionList
            key={collection._id}
            collection={collection}
            className={cn(`bg-collection-${(iter % 3) + 1}`)}
          />
        ))}
        <BottomNavigation />
      </div>
      {/* Main Button */}
      <Button
        className="mx-auto mb-48 mt-6 w-11/12 sm:max-w-screen-sm"
        onClick={handleCreateCollection}
      >
        <Plus /> New Collection
      </Button>
    </div>
  );
}
