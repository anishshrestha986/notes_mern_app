import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../img/logo.png";
import Button from "./Button";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { scrollToThePosition } from "../utils/scrollToThePosition";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { width } = useWindowDimensions();
  return (
    <div className="header-wrapper">
      <nav className="navigation">
        <div className="header-left">
          <Link to="/">
            <img src={logo} alt="logo" className="logo"></img>
          </Link>
        </div>
        <div className="header-center">
          <div
            className={
              isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            }
          >
            <ul className="navigation-container">
              {isNavExpanded ? (
                <div className="cta-buttons">
                  <Link to="/login">
                    <Button buttonType="secondaryButton">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Get Started</Button>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
        <div className="header-right">
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
          {width < 1366 ? (
            ""
          ) : (
            <div className="cta-buttons">
              <Link to="/login">
                <Button buttonType="secondaryButton">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
