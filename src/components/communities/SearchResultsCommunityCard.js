import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiManager from "../../api/ApiManager";

export default function SearchResultsCommunityCard(props) {
  const [profile, setProfile] = useState([]);
  const [
    profileCommunityRelationship,
    setProfileCommunityRelationships,
  ] = useState(true);

  const getProfile = () => {
    ApiManager.getCurrentUser().then((profiles) => {
      setProfile(profiles[0]);
    });
  };

  const getCommunities = () => {
    ApiManager.getCommunities().then((communities) => {
      console.log(communities.length);

      const communitiesByUser = communities.filter(
        (communityRel) =>
          communityRel.profile.id === profile.id &&
          props.community.id === communityRel.community.id
      );
      if (communitiesByUser.length > 0) {
        setProfileCommunityRelationships(true);
      } else {
        setProfileCommunityRelationships(false);
      }
    });
  };

  const followCommunityHandler = () => {
    const profileCommunity = {
      profile_id: profile.id,
      community_id: props.community.id,
    };
    ApiManager.postNewProfileCommunity(profileCommunity).then(
      props.history.push(`communities/${props.community.id}`)
    );
  };

  useEffect(getProfile, []);
  useEffect(getCommunities, [profile]);

  return (
    <>
      <div className="communityImageContainer">
        <img alt="pic" className="communityImage" src={props.community.image} />
        <p>{props.community.name}</p>
        <p>{props.community.description}</p>
      </div>
      {profileCommunityRelationship ? (
        <Link to={`communities/${props.community.id}`}>
          <button>Go to community!</button>
        </Link>
      ) : null}
      {!profileCommunityRelationship ? (
        <img
          onClick={followCommunityHandler}
          src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600697806/Navbar_icons_10_z8cjvg.png"
          alt="follow"
          className="followIcon"
        />
      ) : null}
    </>
  );
}
