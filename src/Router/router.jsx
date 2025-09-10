import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layout/MainLayOut";
import Home from "../Component/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
   
    children:[


      {
        path: '/',
        element: <Home></Home>
      }





    ],

   
  },
]);
export default router;