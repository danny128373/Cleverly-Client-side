import React, { useState, useEffect } from "react";
import ApiManager from "../../api/ApiManager";
import CommunityCard from "./CommunityCard";
import { Button } from "reactstrap";
import "./community.css";

export default function CommunityList(props) {
  const [communities, setCommunities] = useState([
    {
      profile: {},
      community: {
        community: { profile: { id: 0 }, name: "", description: "" },
        profile: {},
      },
    },
  ]);
  const [profile, setProfile] = useState({});

  const getProfile = () => {
    ApiManager.getCurrentUser().then((profile) => {
      setProfile(profile[0]);
    });
  };

  const getCommunities = () => {
    ApiManager.getCommunities().then((communities) => {
      const communitiesByUser = communities.filter(
        (community) => community.profile.id === profile.id
      );
      setCommunities(communitiesByUser);
    });
  };

  useEffect(getProfile, []);
  useEffect(getCommunities, [profile]);

  return (
    <>
      <div className="communityListContainer">
        <div
          onClick={() => props.history.push("/createcommunity")}
          className="createCommunityContainer"
        >
          <img
            alt="create community"
            className="communityIcon"
            src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600704842/Navbar_icons_14_brboww.png"
          />
          <span className="newCommunityText">Create New Community</span>
        </div>

        {communities.map((community) => (
          <CommunityCard
            key={`community--${community.id}`}
            getCommunities={getCommunities}
            getProfile={getProfile}
            community={community}
            {...props}
            profile={profile}
          />
        ))}
      </div>
    </>
  );
}
