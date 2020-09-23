import React, { useRef } from "react";
import useSimpleAuth from "../../hooks/useSimpleAuth";

export default function Login(props) {
  const username = useRef();
  const password = useRef();
  const { login } = useSimpleAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    props.setIsLogged(false);

    const credentials = {
      username: username.current.value,
      password: password.current.value,
    };

    login(credentials).then(() => {
      props.setIsLogged(true);
      props.history.push("/home");
    });
  };

  return (
    <main className="loginContainer">
      <img
        className="logo"
        alt="logo"
        src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600887426/Navbar_icons_17_lp2wno.png"
      />
      <form className="form--login" onSubmit={handleLogin}>
        <fieldset>
          <label htmlFor="inputEmail"> Username </label>
          <input
            ref={username}
            type="username"
            className="form-control"
            placeholder="Username"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputPassword"> Password </label>
          <input
            ref={password}
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <button className="labelFile" type="submit">
            Sign in
          </button>
        </fieldset>
      </form>
    </main>
  );
}
