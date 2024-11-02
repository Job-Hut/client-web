import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./config/router";

import "./index.css";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import CollectionList from "./components/ui/CollectionList";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
      <CollectionList />
    </ApolloProvider>
  </StrictMode>,
);
