import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layout/MainLayOut";
import Home from "../Component/Home/Home";
import ElectronicCardDetails from "../Products/ElectronicsProduct/ElectronicCardDetails";
import WinterProductDetails from "../Products/WinterFashion/WinterProductDetails";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {

        path: '/product/:id',
        element: <ElectronicCardDetails></ElectronicCardDetails>,
        loader: ({params}) => fetch(`http://localhost:5000/electronics/${params.id}`)
        

      },

      {
        path: '/winterproduct/:id',
        element: <WinterProductDetails></WinterProductDetails>,
        loader: ({params}) => fetch(`http://localhost:5000/winterFashion/${params.id}`)

      },

    
     
    ],
  },
]);

export default router;
