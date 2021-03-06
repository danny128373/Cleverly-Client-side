import React, { useRef, useState, useEffect } from "react";
import ApiManager from "../../api/ApiManager";

export default function PostForm(props) {
  const title = useRef();
  const [image, setImage] = useState("");
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

  const uploadImage = async (event) => {
    /**
     * Handles POST to cloudinary and sets state to image with the cloudinary image path.
     */
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
    setImage(file.secure_url);
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
    e.preventDefault();
    if (isValid) {
      const post = {
        title: title.current.value,
        content: image,
        community_id: communityId.community_id,
        profile_id: profile.id,
      };

      ApiManager.postNewPost(post).then(
        props.history.push(`/communities/${communityId.community_id}`)
      );
    } else {
      alert("Please select the community you want to post to!");
    }
  };

  return (
    <>
      <main className="postFormContainer">
        <form className="form--login">
          <h1 className="">Post a Meme!</h1>
          <fieldset>
            <label htmlFor="title" className="labelEditAccount">
              Title:
            </label>
            <input
              ref={title}
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <img src={image} className="postImage" />
            <label className="labelFile accountIcons postForm" htmlFor="image">
              Upload Image
            </label>
            <input
              onChange={uploadImage}
              id="image"
              type="file"
              name="image"
              className="form-control"
              placeholder="image"
            />
          </fieldset>
          <fieldset>
            <select required onChange={handleCommunityChange} id="communityId">
              <option>Select Community</option>
              {communities.map((community) => (
                <option key={community.community.id}>
                  {community.community.name}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <button onClick={onSubmitHandler} className="labelFile">
              Post
            </button>
          </fieldset>
        </form>
      </main>
    </>
  );
}
