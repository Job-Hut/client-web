import { ApolloClient, InMemoryCache, split, ApolloLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import config from "./config";

// Create upload link with CSRF prevention
const uploadLink = createUploadLink({
  uri: config.apiBaseUrl,
  credentials: "include",
  headers: {
    "apollo-require-preflight": "true",
  },
});

// WebSocket link setup
const wsLink = new GraphQLWsLink(
  createClient({
    url: config.apiWebSocketUrl,
    connectionParams: {
      headers: {
        authorization: localStorage.getItem("access_token")
          ? `Bearer ${localStorage.getItem("access_token")?.replace(/^"|"$/g, "")}`
          : "",
      },
    },
  }),
);

// Authentication link
const authLink = setContext((_, { headers }) => {
  let token = localStorage.getItem("access_token");
  if (token) {
    token = token.replace(/^"|"$/g, ""); // Remove the leading and trailing double quotes
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// CSRF prevention link
const csrfLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "apollo-require-preflight": "true",
      "x-apollo-operation-name": operation.operationName || "",
    },
  }));
  return forward(operation);
});

// Combine auth and CSRF links with upload link
const httpLink = ApolloLink.from([csrfLink, authLink, uploadLink]);

// Split operations between WebSocket and HTTP
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

// Create Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});

export default client;
