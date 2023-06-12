import Button from "../components/Button";
import "../styles/landing.css";
import heroImg from "../img/hero-img.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-toggle/style.css";

const Landing = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearTimeout(intervalId);
  }, []);
  const gradientStyle = {
    background:
      "-webkit-linear-gradient(180deg, #756DF5 1.01%, #EDADBB 30.3%, #FBD0B2 80.15%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  };
  return (
    <div className="main-container">
      <div className="hero-section">
        <div className="left-hero-section">
          <div className="hero-title">
            Organize, Personalize,
            <br />
            <span className="hero-text-transition" style={gradientStyle}>
              Noted!
            </span>
          </div>
          <p className="hero-description">Jot down notes as you go.</p>

          <div className="hero-buttons">
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
            <Link to="/login">
              <Button buttonType="secondaryButton">Login</Button>
            </Link>
          </div>
        </div>
        <div className="right-hero-section">
          <img src={heroImg} alt="heroImg" className="hero-img"></img>
        </div>
      </div>
    </div>
  );
};

export default Landing;
