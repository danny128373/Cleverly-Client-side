import React from "react";
import { Button } from "reactstrap";
import "../../cleverly.css";

export default function Main(props) {
  return (
    <div className="mainPageContainer">
      <img
        className="logo"
        alt="logo"
        src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600641738/Navbar_icons_7_c5aftc.png"
      />
      <p>Your memes belong here.</p>

      <Button
        className="labelFile"
        onClick={() => props.history.push("/login")}
      >
        Login
      </Button>
      <p>Don't have an account?</p>
      <Button
        className="labelFile"
        onClick={() => props.history.push("/register")}
      >
        Sign Up
      </Button>
    </div>
  );
}
