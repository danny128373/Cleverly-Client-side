import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import ApiManager from "../../api/ApiManager";
import { Link } from "react-router-dom";
import "./account.css";

export default function Account(props) {
  const [profile, setProfile] = useState({ user: {} });
  const [image, setImage] = useState("");

  const uploadImage = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "userImage");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dp5l2gxzh/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    ApiManager.update({ ...profile, profile_image: file.url }, "profiles").then(
      (e) => {
        setImage(file.secure_url);
      }
    );
  };

  const getProfile = () => {
    ApiManager.getCurrentUser().then((profiles) => {
      setProfile(profiles[0]);
    });
  };

  const handleClick = () => {
    props.history.push(`/account/edit/${profile.id}`);
  };

  const logout = () => {
    props.setIsLogged(false);
    localStorage.removeItem("cleverly_token");
    props.history.push("/");
  };

  useEffect(getProfile, [image]);

  const dateFormatter = (date) => {
    try {
      date =
        date.substring(5, 7) +
        "/" +
        date.substring(8, 10) +
        "/" +
        date.substring(0, 4);
      return date;
    } catch {
      //ignore date is undefined on first render
    }
  };

  useEffect(dateFormatter, [profile]);

  return (
    <div className="profileContainer">
      <div className="profileImageContainer">
        <h1>Account Details</h1>
        <img
          alt="profile image"
          className="profileImage"
          src={profile.profile_image}
        />
      </div>
      <div className="profileUploadContainer">
        <label className="labelFile accountIcons" htmlFor="file">
          Change Profile Photo
          <input
            id="file"
            type="file"
            name="file"
            placeholder="Change Profile"
            onChange={uploadImage}
          />
        </label>

        <Link to={`/account/edit/${profile.id}`}>
          <label className="labelFile accountIcons" htmlFor="file">
            Edit Profile Info
            <input type="file" onClick={handleClick} />
          </label>
        </Link>
      </div>
      <div className="profileInfoContainer">
        <h3>
          {profile.user.first_name} {profile.user.last_name}
        </h3>
        <p>
          <span className="labelEditAccount">About Me:</span> {profile.about}
        </p>
        <p>
          <span className="labelEditAccount">Date joined:</span>{" "}
          {dateFormatter(profile.user.date_joined)}
        </p>
      </div>
      <div className="logout">
        <button className=".labelFile accountButtons" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
