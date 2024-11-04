import Navbar from "@/components/ui/Navbar";
import CardList from "@/components/ui/CardList";
import { gql, useQuery } from "@apollo/client";

export default function Home() {
  const { data, error, loading } = useQuery(gql`
    query GetSortedByPriorityApplication {
      getSortedByPriorityApplication {
        _id
        ownerId
        collectionId
        jobTitle
        description
        organizationName
        organizationAddress
        organizationLogo
        location
        salary
        type
        startDate
        endDate
        createdAt
        updatedAt
        tasks {
          _id
          title
          description
          completed
          dueDate
          createdAt
          updatedAt
        }
      }
    }
  `);

  // handle loading
  if (loading) {
    console.log("loading...");
  }

  // handle error
  if (error) {
    console.log(error);
  }

  console.log(data);
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-secondary">
      <Navbar />
      <CardList />
    </div>
  );
}
