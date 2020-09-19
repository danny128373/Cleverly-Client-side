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
    <>
      <h1>Account Details</h1>
      <div className="profileImageContainer">
        <img
          alt="profile image"
          className="profileImage"
          src={profile.profile_image}
        />
      </div>
      <label className="labelFile" htmlFor="file">
        Change Profile Photo
      </label>
      <div>
        <input
          id="file"
          type="file"
          name="file"
          placeholder="Upload Image"
          onChange={uploadImage}
        />
      </div>
      <h3>
        Name: {profile.user.first_name} {profile.user.last_name}
      </h3>
      <p>About: {profile.about}</p>
      {/* <p>Total likes: {profile.likes}</p> */}
      <p>Date joined: {dateFormatter(profile.user.date_joined)}</p>
      <Link to={`/account/edit/${profile.id}`}>
        <Button onClick={handleClick}>Edit Profile Info</Button>
      </Link>
      <Button>Friend Requests</Button>
      <Button>Friends</Button>
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
