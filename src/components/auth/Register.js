import React, { useRef } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/useSimpleAuth";

function Register(props) {
  const email = useRef();
  const userName = useRef();
  const lastName = useRef();
  const password = useRef();
  const firstName = useRef();
  const about = useRef();
  const verifyPassword = useRef();
  const { register } = useSimpleAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    props.setIsLogged(false);
    const newUser = {
      username: userName.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      about: about.current.value,
      profile_image: "",
      likes: 0,
    };

    register(newUser).then(() => {
      props.setIsLogged(true);
      props.history.push("/home");
    });
  };

  return (
    <form className="registerContainer" onSubmit={handleRegister}>
      <h1 className="">Register</h1>
      <fieldset>
        {/* <label htmlFor="userName"> Username </label> */}
        <input
          ref={userName}
          type="text"
          name="userName"
          className="registerInputs"
          placeholder="Username"
          required
          autoFocus
        />
      </fieldset>
      <fieldset>
        {/* <label htmlFor="firstName"> First Name </label> */}
        <input
          ref={firstName}
          type="text"
          name="firstName"
          className="registerInputs"
          placeholder="First name"
          required
          autoFocus
        />
      </fieldset>
      <fieldset>
        {/* <label htmlFor="lastName"> Last Name </label> */}
        <input
          ref={lastName}
          type="text"
          name="lastName"
          className="registerInputs"
          placeholder="Last name"
          required
        />
      </fieldset>
      <fieldset>
        {/* <label htmlFor="inputEmail"> Email address </label> */}
        <input
          ref={email}
          type="email"
          name="email"
          className="registerInputs"
          placeholder="Email address"
          required
        />
      </fieldset>
      {/* <fieldset>
        <input
          ref={about}
          type="text"
          name="about"
          className="registerInputs"
          placeholder="About"
          required
        />
      </fieldset> */}
      <fieldset>
        <fieldset>
          {/* <label htmlFor="inputPassword"> Password </label> */}
          <input
            ref={password}
            type="password"
            name="password"
            className="registerInputs"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          {/* <label htmlFor="verifyPassword"> Verify Password </label> */}
          <input
            ref={verifyPassword}
            type="password"
            name="verifyPassword"
            className="registerInputs"
            placeholder="Verify password"
            required
          />
        </fieldset>
        <button className="labelFile" type="submit">
          Register
        </button>
      </fieldset>
    </form>
  );
}
export default withRouter(Register);
