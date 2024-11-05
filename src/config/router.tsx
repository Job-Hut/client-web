import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Collection from "@/pages/Collection";
import ApplicationDetail from "@/pages/ApplicationDetail";
import ApplicationForm from "@/pages/ApplicationForm";
import CreateCollection from "@/pages/CreateCollection";
import CollectionDetail from "@/pages/CollectionDetail";
import InviteToGroup from "@/pages/InviteToGroup";
import GroupChat from "@/pages/GroupChat";
import ViewMembers from "@/pages/ViewMembers";
import Jobs from "@/pages/Jobs";

import Applications from "@/pages/Applications";

import BulkInsertApplication from "@/pages/BulkInsertApplication";
import Profile from "@/pages/Profile";
import GuardAuth from "@/components/ui/GuardAuth";
import GuardGuest from "@/components/ui/GuardGuest";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Not Found</div>,
  },
  {
    path: "/",
    element: (
      <GuardAuth>
        <Home />,
      </GuardAuth>
    ),
  },
  {
    path: "/register",
    element: (
      <GuardGuest>
        <Register />,
      </GuardGuest>
    ),
  },
  {
    path: "/login",
    element: (
      <GuardGuest>
        <Login />,
      </GuardGuest>
    ),
  },
  {
    path: "/collections",
    element: (
      <GuardAuth>
        <Collection />,
      </GuardAuth>
    ),
  },
  {
    path: "/applications/:_id",
    element: (
      <GuardAuth>
        <ApplicationDetail />,
      </GuardAuth>
    ),
  },
  {
    path: "/applications/:_id/edit",
    element: (
      <GuardAuth>
        <ApplicationForm />,
      </GuardAuth>
    ),
  },
  {
    path: "/create-collection",
    element: <CreateCollection />,
  },
  {
    path: "/collections/:_id",
    element: <CollectionDetail />,
  },
  {
    path: "/invite-user/:_id",
    element: <InviteToGroup />,
  },
  {
    path: "/group-chat",
    element: <GroupChat />,
  },
  {
    path: "/view-joined-members/:_id",
    element: <ViewMembers />,
  },
  {
    path: "/view-online-members/:_id",
    element: <ViewMembers />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/applications",
    element: <Applications />,
  },
  {
    path: "/insert-applications-to-collection/:_id",
    element: <BulkInsertApplication />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
