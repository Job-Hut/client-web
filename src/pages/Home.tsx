import Navbar from "@/components/ui/Navbar";
import CardList from "@/components/ui/CardList";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-secondary">
      <Navbar />
      <CardList />
    </div>
  );
}
