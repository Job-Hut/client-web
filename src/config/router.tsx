import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import InviteToGroup from "@/pages/InviteToGroup";

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
  }
]);

export default router;
