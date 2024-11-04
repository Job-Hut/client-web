import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Collection from "@/pages/Collection";
import ApplicationDetail from "@/pages/ApplicationDetail";
import CreateCollection from "@/pages/CreateCollection";

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
    path: "/create-collection",
    element: <CreateCollection />
  }
]);

export default router;
