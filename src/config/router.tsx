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


const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Not Found</div>,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/collections",
    element: <Collection />,
  },
  {
    path: "/applications/:_id",
    element: <ApplicationDetail />,
  },
  {
    path: "/applications/:_id/edit",
    element: <ApplicationForm />,
  },
  {
    path: "/create-collection",
    element: <CreateCollection />
  },
  {
    path: "/collections/:_id",
    element: <CollectionDetail />
  },
  {
    path: "/invite-user/:_id",
    element: <InviteToGroup />
  },
  {
    path: "/group-chat",
    element: <GroupChat />
  },
  {
    path: "/view-joined-members/:_id",
    element: <ViewMembers />
  },
  {
    path: "/view-online-members/:_id",
    element: <ViewMembers />
  }
]);

export default router;
