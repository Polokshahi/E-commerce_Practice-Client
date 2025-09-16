
import { Outlet } from "react-router";
import SideBar from "./SideBar";
import Header from "./Header";


const DashboardLayout = () => {
    return (
        <div className="flex h-screen">
            <SideBar />
            <div className="flex-1 flex flex-col bg-gray-50">
                <Header />
                <main className="p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
