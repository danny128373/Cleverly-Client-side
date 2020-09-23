import React from "react";
import "../../cleverly.css";

export default function Main(props) {
  return (
    <div className="mainPageContainer">
      <img
        className="logo"
        alt="logo"
        src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600825002/Navbar_icons_15_lc5icu.png"
      />
      <p className="slogan">Your memes belong here.</p>

      <button
        className="labelFile"
        onClick={() => props.history.push("/login")}
      >
        Login
      </button>
      <p className="needAccount">Don't have an account?</p>
      <button
        className="labelFile"
        onClick={() => props.history.push("/register")}
      >
        Sign Up
      </button>
    </div>
  );
}
