import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import "../../styles/dashboard/dashboard.css";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
const PageInfo = ({ pathName }: { pathName: string }) => {
  return (
    <div className="page-info">
      <div className="current-page">{pathName}</div>
      <div className="sub-heading">Organize your notes.</div>
    </div>
  );
};
const DashBoardLayout = () => {
  const { width } = useWindowDimensions();
  const { pathname } = useLocation();
  let pageHeading = pathname.split("/")[2];
  if (pageHeading) {
    const capitalizedPathName = pageHeading.charAt(0).toUpperCase();
    pageHeading = capitalizedPathName + pageHeading.slice(1);
  }

  const location = useLocation();
  const [dashboardVisibility, setdashboardVisibility] = useState(false);
  useEffect(() => {
    if (location.pathname.match(/mynotes$/)) setdashboardVisibility(true);
    else setdashboardVisibility(false);
  }, [location]);

  return (
    <>
      <div className="dashboard-layout">
        <Header />
        <div className="dashboard-lower">
          <>
            {width < 990 ? (
              ""
            ) : (
              <div className="dashboard-side">
                {" "}
                <PageInfo pathName={pageHeading ? pageHeading : "My Notes"} />
                <SideBar />
              </div>
            )}
            {dashboardVisibility && <Dashboard />}
            <Outlet />
          </>
        </div>
      </div>
    </>
  );
};

export default DashBoardLayout;
