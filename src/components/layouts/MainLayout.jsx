import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="container py-10">
            <Outlet />
        </div>
    );
};

export default MainLayout;