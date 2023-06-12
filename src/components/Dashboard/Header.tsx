import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useGreetings from "../../hooks/useGreetings";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import logo from "../../img/logo.png";
import "../../styles/dashboard/header.css";
import SideBar from "./Sidebar";
import userAvatar from "../../img/user-avatar.png";
const Header = () => {
  const { width } = useWindowDimensions();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const greetings = useGreetings();
  const user = useAuth().user;
  return (
    <div className="dashboard-header-wrapper">
      <nav className="dashboard-navigation">
        <div className="dashboard-header-left">
          <Link to="/">
            <img src={logo} alt="logo" className="logo"></img>
          </Link>
        </div>
        <div className="dashboard-header-center">
          <div
            className={
              isNavExpanded
                ? "dashboard-navigation-menu expanded"
                : "dashboard-navigation-menu"
            }
          >
            <ul className="dashboard-navigation-container">
              {isNavExpanded && width < 990 ? <SideBar /> : ""}
            </ul>
          </div>
        </div>
        <div className="dashboard-header-right" style={{ flex: "0.3" }}>
          <button
            className="hamburger"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="85" height="8"></rect>
              <rect y="30" width="85" height="8"></rect>
              <rect y="60" width="85" height="8"></rect>
            </svg>
          </button>
          {width < 990 ? (
            ""
          ) : (
            <div>
              <div className="user">
                <div className="user-image">
                  <img src={userAvatar} alt="" />
                </div>
                <div className="user-wrapper">
                  <div className="user-greetings">{greetings}</div>
                  <div className="user-name">{user?.username}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
