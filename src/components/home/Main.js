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
      <p>Super awesome slogan for Cleverly.</p>
      <Button onClick={() => props.history.push("/register")}>Register</Button>
      <p>Already have an account?</p>
      <Button onClick={() => props.history.push("/login")}>Login</Button>
    </div>
  );
}
