import React, { useRef, useState, useEffect } from "react";
import ApiManager from "../../api/ApiManager";
import "../posts/post.css";
import "../accounts/account.css";

export default function PostTextForm(props) {
  const title = useRef();
  const image = useRef();
  const [communities, setCommunities] = useState([
    { profile: {}, community: { profile: {} } },
  ]);
  const [communityId, setCommunityId] = useState({ community_id: "" });
  const [profile, setProfile] = useState({});
  const [isValid, setIsValid] = useState(false);

  const getProfile = () => {
    /**
     * Fetches current user
     */
    ApiManager.getCurrentUser().then((profile) => {
      setProfile(profile[0]);
    });
  };

  const getCommunities = () => {
    /**Grabs communities the user is currently following */
    ApiManager.getCommunities().then((communities) => {
      const communitiesByUser = communities.filter(
        (community) => community.profile.id === profile.id
      );
      setCommunities(communitiesByUser);
    });
  };

  const handleCommunityChange = (event) => {
    /**
     * Handles community user is going to be posting on and sets the state to communityId
     */
    const stateToChange = { ...communityId };
    stateToChange[event.target.id] = event.target.value;
    const community = communities.filter(
      (community) => community.community.name === stateToChange[event.target.id]
    );
    stateToChange.community_id = community[0].community.id;
    setCommunityId(stateToChange);
    setIsValid(true);
  };

  useEffect(getProfile, []);
  useEffect(getCommunities, [profile]);

  const onSubmitHandler = (e) => {
    /**
     * Handles postform submission and redirects users to the community they just posted their post in.
     */
    if (isValid) {
      const post = {
        title: title.current.value,
        content: image.current.value,
        community_id: communityId.community_id,
        profile_id: profile.id,
      };

      ApiManager.postNewPost(post).then(
        props.history.push(`/communities/${communityId.community_id}`)
      );
    } else {
      e.preventDefault();
      alert("Please select the community you want to post to!");
    }
  };

  return (
    <>
      <main className="postFormContainer">
        <form className="">
          <h1 className="">Post a Meme!</h1>
          <fieldset>
            <label htmlFor="title" className="labelEditAccount">
              {" "}
              Title:{" "}
            </label>
            <input
              ref={title}
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="image" className="labelEditAccount">
              Content:
            </label>
            <textarea
              ref={image}
              id="image"
              rows="4"
              maxLength="512"
              type="text"
              name="image"
              className="postTitleTextArea"
              placeholder="Content"
            />
          </fieldset>
          <fieldset>
            <select
              className="communityListTextForm"
              required
              onChange={handleCommunityChange}
              id="communityId"
            >
              <option>Select Community</option>
              {communities.map((community) => (
                <option key={community.community.id}>
                  {community.community.name}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <button className="labelFile" onClick={onSubmitHandler}>
              Post
            </button>
          </fieldset>
        </form>
      </main>
    </>
  );
}
