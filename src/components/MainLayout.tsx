import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Landing from "../pages/Landing";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Landing />
      <Outlet />
    </>
  );
};

export default MainLayout;
