import Navbar from "@/components/ui/Navbar";
import CardList from "@/components/ui/CardList";
import { gql, useQuery } from "@apollo/client";
import BottomNavigation from "@/components/ui/BottomNavigation";

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

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-secondary">
      <Navbar />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center">Error: {error.message}</p>}

      {data?.getSortedByPriorityApplication?.length == 0 && (
        <p className="mt-8 text-center">
          There is no upcoming task at this moment
        </p>
      )}

      {data?.getSortedByPriorityApplication && (
        <CardList applications={data?.getSortedByPriorityApplication} />
      )}
      <BottomNavigation />
    </div>
  );
}
