import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./config/router";

import "./index.css";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";
import { OnlinePresenceProvider } from "./context/OnlinePresenceContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <OnlinePresenceProvider>
        <AuthProvider>
          <Toaster />
          <RouterProvider router={router} />
        </AuthProvider>
      </OnlinePresenceProvider>
    </ApolloProvider>
  </StrictMode>,
);
