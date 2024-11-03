import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./config/router";

import "./index.css";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { AuthProvider } from "./context/AuthContext";
import CollectionDetail from "./pages/CollectionDetail";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
        <CollectionDetail />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
);
