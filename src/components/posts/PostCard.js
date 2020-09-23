import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiManager from "../../api/ApiManager";
import { Card, CardBody } from "reactstrap";
import "./post.css";

export default function PostCard(props) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isUserPost, setIsUserPost] = useState(false);
  const [isImage, setIsImage] = useState(true);
  const [profile, setProfile] = useState({ id: 0, user: {} });
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [post, setPost] = useState({
    id: 0,
    content: "",
    title: "",
    profile: { id: 0, user: {} },
    community: { name: "" },
  });
  const [currentUserReaction, setCurrentUserReaction] = useState({
    id: 0,
    status: "",
    post: {
      id: 0,
      content: "",
      title: "",
      profile: { id: 0, user: {} },
      community: { name: "" },
    },
    profile: { id: 0, user: {} },
  });

  const getProfile = () => {
    /**
     * Grabs current user that's logged in.
     */
    ApiManager.getCurrentUser().then((profile) => {
      setProfile(profile[0]);
    });
  };

  const isEditPostImage = () => {
    /**
     * Checks to see if meme content is text or an image.
     */
    try {
      if (post.content.includes("cloudinary")) {
        setIsImage(true);
      } else {
        setIsImage(false);
      }
    } catch (error) {
      //Ignoring since first render post is undefined until useEffect kicks in
    }
  };

  const getAllProfilePostReactions = () => {
    /**
     * Checks if user has already reacted to post.
     * Fetches number of likes and dislikes of post.
     */
    ApiManager.getAll("profilepostreactions")
      .then((profilePostReactions) => {
        const currentReaction = profilePostReactions.find(
          (relationship) =>
            relationship.profile.id === profile.id &&
            relationship.post.id === props.post.id
        );
        const likes = profilePostReactions.filter(
          (relationship) =>
            props.post.id === relationship.post.id &&
            relationship.status === "likes"
        );
        const dislikes = profilePostReactions.filter(
          (relationship) =>
            props.post.id === relationship.post.id &&
            relationship.status === "dislikes"
        );

        setLikes(likes.length);
        setDislikes(dislikes.length);
        if (currentReaction) {
          setCurrentUserReaction(currentReaction);
          if (currentReaction.status === "likes") {
            setIsLike(true);
          } else {
            setIsLike(false);
          }
          if (currentReaction.status === "dislikes") {
            setIsDislike(true);
          } else {
            setIsDislike(false);
          }
        } else {
          setCurrentUserReaction({
            id: 0,
            status: "",
            post: {},
            profile: { user: {} },
          });
        }
      })
      .then(getPost);
  };

  const likeHandler = () => {
    /**
     * Handles event of user clicking like on a post.
     */
    if (currentUserReaction.id === 0) {
      ApiManager.post(
        { post_id: post.id, profile_id: profile.id, status: "likes" },
        "profilepostreactions"
      )
        .then(getPost)
        .then(getAllProfilePostReactions);
    } else if (currentUserReaction.status === "dislikes") {
      ApiManager.update(
        {
          id: currentUserReaction.id,
          post_id: post.id,
          profile_id: profile.id,
          status: "likes",
        },
        "profilepostreactions"
      )
        .then(getPost)
        .then(getAllProfilePostReactions);
    } else if (currentUserReaction.status === "likes") {
      ApiManager.update(
        {
          id: currentUserReaction.id,
          post_id: post.id,
          profile_id: profile.id,
          status: "neutral",
        },
        "profilepostreactions"
      )
        .then(getPost)
        .then(getAllProfilePostReactions);
    } else {
      ApiManager.update(
        {
          id: currentUserReaction.id,
          post_id: post.id,
          profile_id: profile.id,
          status: "likes",
        },
        "profilepostreactions"
      )
        .then(getPost)
        .then(getAllProfilePostReactions);
    }
  };

  const dislikeHandler = () => {
    /**
     * Handles event of user clicking dislike on a post.
     */
    if (currentUserReaction.id === 0) {
      ApiManager.post(
        { post_id: post.id, profile_id: profile.id, status: "dislikes" },
        "profilepostreactions"
      )
        .then(getPost)
        .then(getAllProfilePostReactions);
    } else if (currentUserReaction.status === "likes") {
      ApiManager.update(
        {
          id: currentUserReaction.id,
          post_id: post.id,
          profile_id: profile.id,
          status: "dislikes",
        },
        "profilepostreactions"
      )
        .then(getPost)
        .then(getAllProfilePostReactions);
    } else if (currentUserReaction.status === "dislikes") {
      ApiManager.update(
        {
          id: currentUserReaction.id,
          post_id: post.id,
          profile_id: profile.id,
          status: "neutral",
        },
        "profilepostreactions"
      )
        .then(getPost)
        .then(getAllProfilePostReactions);
    } else {
      ApiManager.update(
        {
          id: currentUserReaction.id,
          post_id: post.id,
          profile_id: profile.id,
          status: "dislikes",
        },
        "profilepostreactions"
      )
        .then(getPost)
        .then(getAllProfilePostReactions);
    }
  };

  const getPost = () => {
    /**
     * Grabs post info and sets it to the state post.
     */
    if (props.post.id > 0) {
      ApiManager.get(props.post, "posts").then((post) => setPost(post));
    } else {
      setPost({ id: 0, profile: {}, content: "", title: "" });
    }
  };

  const checkUserPost = () => {
    /**
     * Checks if user is the user that created the post.
     */
    if (
      props.post.profile.id === profile.id &&
      props.post.profile.id !== undefined
    ) {
      setIsUserPost(true);
    } else {
      setIsUserPost(false);
    }
  };

  useEffect(checkUserPost, [isUserPost, profile, post]);
  useEffect(getAllProfilePostReactions, [profile]);
  useEffect(getPost, [currentUserReaction]);
  useEffect(isEditPostImage, [post]);
  useEffect(getProfile, []);

  return (
    <>
      <Card className="parentPostCardContainer">
        <div className="communityGridContainer">
          <img
            alt="community"
            src={props.post.community.image}
            className="communityImagePostCard"
          />
          <div>#{props.post.community.name}</div>
          <div className="communityTitle">
            @{props.post.profile.user.username}
          </div>
        </div>
        <h5 className="postCardTitle">{props.post.title}</h5>

        <div className="postCardContainer">
          {isImage ? (
            <div className="postImageContainer">
              <img alt="postContent" className="postImage" src={post.content} />
            </div>
          ) : (
            <CardBody>{post.content}</CardBody>
          )}
        </div>

        {!isUserPost ? (
          <div>
            {isLike ? (
              <img
                onClick={likeHandler}
                className="cardIcons"
                alt="upvote"
                src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600639449/14_sam5lx.png"
              />
            ) : (
              <img
                onClick={likeHandler}
                className="cardIcons"
                alt="upvote"
                src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600635732/13_nrelm7.png"
              />
            )}

            {likes}
            {isDislike ? (
              <img
                onClick={dislikeHandler}
                className="cardIcons"
                alt="downvote"
                src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600635732/15_azrceu.png"
              />
            ) : (
              <img
                onClick={dislikeHandler}
                className="cardIcons"
                alt="downvote"
                src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600635732/16_u1qngs.png"
              />
            )}
            {dislikes}
            <Link to={`/posts/${props.post.id}`}>
              <img
                alt="comment"
                className="cardIcons"
                src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600637458/Navbar_icons_6_phxdue.png"
              />
            </Link>
          </div>
        ) : (
          <div>
            <img
              className="cardIcons"
              alt="upvote"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600635732/13_nrelm7.png"
            />
            {likes}
            <img
              className="cardIcons"
              alt="downvote"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600635732/16_u1qngs.png"
            />
            {dislikes}
            <Link to={`/posts/${props.post.id}`}>
              <img
                alt="comment"
                className="cardIcons"
                src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600637458/Navbar_icons_6_phxdue.png"
              />
            </Link>
          </div>
        )}
      </Card>
    </>
  );
}
