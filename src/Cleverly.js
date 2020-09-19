import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import ApplicationViews from "./ApplicationViews";
import Navbar from "./components/navbar/Navbar";

function Cleverly(props) {
  const [isLogged, setIsLogged] = useState(true);

  const isAuthenticated = () =>
    isLogged || localStorage.getItem("cleverly_token") !== null;

  useEffect(isAuthenticated, []);

  return (
    <>
      {isLogged ? (
        <Route
          render={(props) => {
            return (
              <Navbar
                {...props}
                isLogged={isLogged}
                setIsLogged={setIsLogged}
              />
            );
          }}
        />
      ) : null}
      <ApplicationViews
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        {...props}
      />
    </>
  );
}

export default withRouter(Cleverly);
