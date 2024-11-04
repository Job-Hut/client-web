import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import InviteToGroup from "@/pages/InviteToGroup";
import ApplicationDetail from "@/pages/ApplicationDetail";

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
    path: "/applications/:_id",
    element: <ApplicationDetail />,
  },
]);

export default router;
