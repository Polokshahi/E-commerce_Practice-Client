import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layout/MainLayOut";
import Home from "../Component/Home/Home";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
     
    ],
  },
]);

export default router;
