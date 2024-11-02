import { Button } from "@/components/ui/button";
import CollectionList from "@/components/ui/CollectionList";

export default function Collection() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="mt-[20px] flex flex-col items-center justify-center">
        <CollectionList />
        <CollectionList />
        <CollectionList />
      </div>
      <Button className="mb-[20px] w-[350px]">New Collection</Button>
    </div>
  );
}
