import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ApiManager from "../../api/ApiManager";
import { Button } from "reactstrap";

export default function AccountEditForm(props) {
  const [profile, setProfile] = useState({ user: {} });
  const first_name = useRef();
  const last_name = useRef();

  const getProfile = () => {
    ApiManager.getCurrentUser().then((profiles) => {
      setProfile(profiles[0]);
    });
  };

  useEffect(getProfile, []);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...profile };
    stateToChange[evt.target.id] = evt.target.value;
    setProfile(stateToChange);
  };

  const updateProfile = () => {
    const stateToPost = {
      ...profile,
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      about: profile.about,
    };
    ApiManager.update(stateToPost, "profiles").then((e) => {
      props.history.push("/account");
    });
  };

  return (
    <div className="accountEditFormContainer">
      <h1 className="profileEditTitle">Profile Edit</h1>
      <form>
        <fieldset>
          <label className="labelEditAccount">First Name:</label>
          <input
            id="firstName"
            className="inputEditAccount"
            ref={first_name}
            type="text"
            defaultValue={profile.user.first_name}
          />
        </fieldset>
        <fieldset>
          <label className="labelEditAccount">Last Name:</label>
          <input
            className="inputEditAccount"
            id="lastName"
            ref={last_name}
            type="text"
            defaultValue={profile.user.last_name}
          />
        </fieldset>
        <fieldset>
          <label className="labelEditAccount" htmlFor="about">
            About Me:
          </label>
          <textarea
            id="about"
            className="inputEditAccount"
            onChange={handleFieldChange}
            type="text"
            rows="4"
            maxLength="512"
            defaultValue={profile.about}
          />
        </fieldset>
        <Link>
          <button
            className="labelFile"
            id="profileEditSubmitButton"
            onClick={updateProfile}
          >
            Submit Changes
          </button>
        </Link>
      </form>
    </div>
  );
}
