import client from "@/config/client";
import { gql } from "@apollo/client";

const fetchData = async () => {
  const result = await client.query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  });
  console.log(result);
};

export default fetchData;
