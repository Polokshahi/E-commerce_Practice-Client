import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layout/MainLayOut";
import Card from "../Component/Card/Card";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children:[
        {
            path: '/',
            element: <Card></Card>
        }
    ]
  },
]);
export default router;