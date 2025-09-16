import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layout/MainLayOut";
import Home from "../Component/Home/Home";
import ElectronicCardDetails from "../Products/ElectronicsProduct/ElectronicCardDetails";
import WinterProductDetails from "../Products/WinterFashion/WinterProductDetails";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";
import UserProfile from "../Component/UserProfile/UserProfile";
import DashBoard from "../DashBoard/DashBoard";
import Dashboard from "../DashBoard/DashBoard";
import DashboardLayout from "../DashBoard/DashBoardLayOut";
import Customer from "../DashBoard/Customer";
import Stock from "../DashBoard/Stock";
import POSSale from "../DashBoard/POSSale";
import Sales from "../DashBoard/Sales";
import Transfer from "../DashBoard/Transfer";
import TotalCustomerDetails from "../DashBoard/DashBoardPage/TotalCustomar/TotalCustomerDetails";
import TotalInvoiceDetails from "../DashBoard/DashBoardPage/TotalInvoice/TotalInvoiceDetails";
import TotalProductDetails from "../DashBoard/DashBoardPage/TotalProduct/TotalProductDetails";
import TotalSupplierDetails from "../DashBoard/DashBoardPage/TotalSupplier/TotalSupplierDetails";





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
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },


      {

        path: '/product/:id',
        element: <ElectronicCardDetails></ElectronicCardDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/electronics/${params.id}`)


      },

      {
        path: '/winterproduct/:id',
        element: <WinterProductDetails></WinterProductDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/winterFashion/${params.id}`)

      },

      {
        path: '/Userprofile',
        element: <UserProfile></UserProfile>,

      },






    ],






  },


  // DashBoard Route

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },

      {
        path: '/customer',
        element: <Customer></Customer>,


      },


      {
        path: '/stock',
        element: <Stock></Stock>,

      },

      {
        path: '/possale',
        element: <POSSale></POSSale>,

      },


      {
        path: '/sales',
        element: <Sales></Sales>,

      },
      {
        path: '/transfer',
        element: <Transfer></Transfer>,

      },


      {
        path: '/customerDetails',
        element: <TotalCustomerDetails></TotalCustomerDetails>

      },

      {
        path: '/invoiceDetails',
        element: <TotalInvoiceDetails> </TotalInvoiceDetails>

      },

      {
        path: '/productDetails',
        element: <TotalProductDetails></TotalProductDetails>,
        
      },

      {
        path: '/supplierDetails',
        element: <TotalSupplierDetails></TotalSupplierDetails>
      }












    ]
  }













]);

export default router;
