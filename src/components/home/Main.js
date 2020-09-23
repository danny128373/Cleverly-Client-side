import React from "react";
import "../../cleverly.css";

export default function Main(props) {
  /**
   * JSX for main page when user is not logged in.
   */
  return (
    <div className="mainPageContainer">
      <img
        className="logo"
        alt="logo"
        src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600887426/Navbar_icons_17_lp2wno.png"
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
