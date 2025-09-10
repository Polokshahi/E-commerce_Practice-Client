import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layout/MainLayOut";
import Card from "../Component/Card/Card";
import Banner from "../Component/Banner/Banner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children:[

      {

        path: '/banner',
        element: <Banner></Banner>

      },
        {
            path: '/',
            element: <Card></Card>
        }
    ]
  },
]);
export default router;