import React, { useState, useEffect } from "react";
import ApiManager from "../../api/ApiManager";
import CommentList from "../comments/CommentList";
import { Card } from "reactstrap";

export default function PostDetail(props) {
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [isUserPost, setIsUserPost] = useState(false);
  const [isImage, setIsImage] = useState(true);
  const [profile, setProfile] = useState({ id: 0, user: {} });
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [post, setPost] = useState({
    id: 0,
    content: "",
    title: "",
    profile: { id: 0, user: {} },
    community: { profile: { user: {} } },
  });
  const [currentUserReaction, setCurrentUserReaction] = useState({
    id: 0,
    status: "",
    post: {},
    profile: { id: 0, user: {} },
  });

  const isEditPostImage = () => {
    /**
     * Checks if content of post is an image or text.
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

  const handleDelete = () => {
    /**
     * Handles event of user selecting the delete icon. Only the post owner has this option.
     */
    ApiManager.delete(props.postId, "posts").then(
      props.history.push(props.history.goBack())
    );
  };

  const getPost = () => {
    /**
     * Grabs post info and sets the state of post.
     */
    ApiManager.getPost(props.postId).then((post) => {
      setPost(post);
    });
  };

  const getProfile = () => {
    /**
     * Grabs current user that's logged in.
     */
    ApiManager.getCurrentUser().then((profiles) => {
      setProfile(profiles[0]);
    });
  };

  const onClickHandler = () => {
    /**
     * Handles event of user clicking on the edit icon. User is sent to PostEditForm. Only post owner has this option.
     */
    props.history.push(`/posts/edit/${props.postId}`);
  };

  const likeHandler = () => {
    /**
     * Handles event of user clicking like on post.
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
     * Handles event of user clicking dislike on post.
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

  const checkUserPost = () => {
    /**
     * Checks if current user is post owner.
     */
    if (profile.id === post.profile.id && profile.id !== undefined) {
      setIsUserPost(true);
    } else {
      setIsUserPost(false);
    }
  };

  const getAllProfilePostReactions = () => {
    /**
     * Checks if current user has reacted to post.
     * Grabs total of likes and dislikes of post.
     */
    ApiManager.getAll("profilepostreactions")
      .then((profilePostReactions) => {
        const currentReaction = profilePostReactions.find(
          (relationship) =>
            relationship.profile.id === profile.id &&
            relationship.post.id === post.id
        );
        const likes = profilePostReactions.filter(
          (relationship) =>
            post.id === relationship.post.id && relationship.status === "likes"
        );
        const dislikes = profilePostReactions.filter(
          (relationship) =>
            post.id === relationship.post.id &&
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

  useEffect(checkUserPost, [post, isUserPost, profile]);
  useEffect(getAllProfilePostReactions, [profile]);
  useEffect(getPost, [currentUserReaction]);
  useEffect(isEditPostImage, [post]);
  useEffect(getProfile, []);

  return (
    <div className="postDetailContainer">
      <Card className="parentPostCardContainer">
        <div className="communityGridContainer">
          <img
            alt="community"
            src={post.community.image}
            className="communityImagePostCard"
          />
          <div># {post.community.name}</div>
          <div>@{post.profile.user.username}</div>
        </div>
        <h5>{post.title}</h5>

        {isImage ? (
          <img className="postImage" alt="postContent" src={post.content} />
        ) : (
          <h5>{post.content}</h5>
        )}
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
            <>
              <img
                id="editPostDetail"
                onClick={onClickHandler}
                className="cardIcons"
                src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600701613/Navbar_icons_12_nhdgeb.png"
              />
              <img
                className="cardIcons"
                src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600701849/Navbar_icons_13_vtg7jt.png"
                onClick={handleDelete}
              />
            </>
          </div>
        )}
      </Card>
      <Card className="parentPostCardContainer">
        <h3>Comments</h3>
        <CommentList {...props} postId={props.postId} />
      </Card>
    </div>
  );
}
