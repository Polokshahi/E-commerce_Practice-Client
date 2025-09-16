
import TotalCustomerCard from "./DashBoardPage/TotalCustomar/TotalCustomarCard";
import TotalProductCard from "./DashBoardPage/TotalProduct/TotalProductaCard";
import TotalSupplierCard from "./DashBoardPage/TotalSupplier/TotalSupplierCard";
import TotalInvoiceCard from "./DashBoardPage/TotalInvoice/TotalInvoiceCard";

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <TotalCustomerCard />
        <TotalProductCard />
        <TotalSupplierCard />
        <TotalInvoiceCard />
      </div>
    </div>
  );
};

export default Dashboard;
