import React, { useState, useEffect, useRef } from "react";
import ApiManager from "../../api/ApiManager";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

export default function CommentCard(props) {
  const [isUserComment, setIsUserComment] = useState(false);
  const content = useRef();

  const [modal, setModal] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [likes, setLikes] = useState(false);
  const [dislikes, setDislikes] = useState(false);
  const [
    currentUserCommentRelationship,
    setCurrentUserCommentRelationship,
  ] = useState({ id: 0, status: "", comment: {}, profile: { user: {} } });

  const toggle = () => {
    setModal(!modal);
  };

  const handleDelete = () => {
    ApiManager.delete(props.comment.id, "comments").then(props.getComments);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const editedComment = {
      ...props.comment,
      content: content.current.value,
      id: props.comment.id,
    };
    ApiManager.update(editedComment, "comments")
      .then()
      .then(props.getComments)
      .then(setModal(!modal));
  };

  const likeHandler = () => {
    if (currentUserCommentRelationship.id === 0) {
      ApiManager.post(
        {
          comment_id: props.comment.id,
          profile_id: props.profile.id,
          status: "likes",
        },
        "profilelikescomments"
      )
        .then(props.getComments)
        .then(getAllProfileLikesCommentRelationships);
    } else if (currentUserCommentRelationship.status === "dislikes") {
      ApiManager.update(
        {
          id: currentUserCommentRelationship.id,
          comment_id: props.comment.id,
          profile_id: props.profile.id,
          status: "likes",
        },
        "profilelikescomments"
      )
        .then(props.getComments)
        .then(getAllProfileLikesCommentRelationships);
    } else if (currentUserCommentRelationship.status === "likes") {
      ApiManager.update(
        {
          id: currentUserCommentRelationship.id,
          comment_id: props.comment.id,
          profile_id: props.profile.id,
          status: "neutral",
        },
        "profilelikescomments"
      )
        .then(props.getComments)
        .then(getAllProfileLikesCommentRelationships);
    } else {
      ApiManager.update(
        {
          id: currentUserCommentRelationship.id,
          comment_id: props.comment.id,
          profile_id: props.profile.id,
          status: "likes",
        },
        "profilelikescomments"
      )
        .then(props.getComments)
        .then(getAllProfileLikesCommentRelationships);
    }
  };

  const dislikeHandler = () => {
    if (currentUserCommentRelationship.id === 0) {
      ApiManager.post(
        {
          comment_id: props.comment.id,
          profile_id: props.profile.id,
          status: "dislikes",
        },
        "profilelikescomments"
      )
        .then(props.getComments)
        .then(getAllProfileLikesCommentRelationships);
    } else if (currentUserCommentRelationship.status === "likes") {
      ApiManager.update(
        {
          id: currentUserCommentRelationship.id,
          comment_id: props.comment.id,
          profile_id: props.profile.id,
          status: "dislikes",
        },
        "profilelikescomments"
      )
        .then(props.getComments)
        .then(getAllProfileLikesCommentRelationships);
    } else if (currentUserCommentRelationship.status === "dislikes") {
      ApiManager.update(
        {
          id: currentUserCommentRelationship.id,
          comment_id: props.comment.id,
          profile_id: props.profile.id,
          status: "neutral",
        },
        "profilelikescomments"
      )
        .then(props.getComments)
        .then(getAllProfileLikesCommentRelationships);
    } else {
      ApiManager.update(
        {
          id: currentUserCommentRelationship.id,
          comment_id: props.comment.id,
          profile_id: props.profile.id,
          status: "dislikes",
        },
        "profilelikescomments"
      )
        .then(props.getComments)
        .then(getAllProfileLikesCommentRelationships);
    }
  };

  const getAllProfileLikesCommentRelationships = () => {
    ApiManager.getAll("profilelikescomments")
      .then((profilelikescomments) => {
        const currentStatus = profilelikescomments.find(
          (relationship) =>
            relationship.profile.id === props.profile.id &&
            relationship.comment.id === props.comment.id
        );
        const likes = profilelikescomments.filter(
          (relationship) =>
            props.comment.id === relationship.comment.id &&
            relationship.status === "likes"
        );
        const dislikes = profilelikescomments.filter(
          (relationship) =>
            props.comment.id === relationship.comment.id &&
            relationship.status === "dislikes"
        );
        setLikes(likes.length);
        setDislikes(dislikes.length);
        if (currentStatus) {
          setCurrentUserCommentRelationship(currentStatus);
          if (currentStatus.status === "likes") {
            setIsLike(true);
          } else {
            setIsLike(false);
          }
          if (currentStatus.status === "dislikes") {
            setIsDislike(true);
          } else {
            setIsDislike(false);
          }
        } else {
          setCurrentUserCommentRelationship({
            id: 0,
            status: "",
            comment: {},
            profile: { user: {} },
          });
        }
      })
      .then(props.getComments);
  };

  const checkUserComment = () => {
    if (
      props.profile.id === props.comment.profile.id &&
      props.comment.profile.id !== undefined
    ) {
      setIsUserComment(true);
    } else {
      setIsUserComment(false);
    }
  };

  useEffect(checkUserComment, [isUserComment]);
  useEffect(getAllProfileLikesCommentRelationships, [props.profile]);
  useEffect(props.getComments, [currentUserCommentRelationship]);

  return (
    <div className="commentCardContainer">
      <p>@{props.comment.profile.user.username}</p>
      <p>{props.comment.content}</p>
      {!isUserComment ? (
        <>
          {isLike ? (
            <img
              onClick={likeHandler}
              className="cardIcons"
              alt="upvote"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600639449/14_sam5lx.png"
            />
          ) : (
            <img
              alt="upvote"
              className="cardIcons"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600635732/13_nrelm7.png"
              onClick={likeHandler}
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
        </>
      ) : (
        <>
          {isLike ? (
            <img
              className="cardIcons"
              alt="upvote"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600639449/14_sam5lx.png"
            />
          ) : (
            <img
              alt="upvote"
              className="cardIcons"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600635732/13_nrelm7.png"
            />
          )}

          {likes}
          {isDislike ? (
            <img
              className="cardIcons"
              alt="downvote"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600635732/15_azrceu.png"
            />
          ) : (
            <img
              className="cardIcons"
              alt="downvote"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600635732/16_u1qngs.png"
            />
          )}
          {dislikes}
          <img
            id="editCommentCard"
            className="cardIcons"
            src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600701613/Navbar_icons_12_nhdgeb.png"
            onClick={toggle}
            Edit
          />

          <img
            className="cardIcons"
            src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600701849/Navbar_icons_13_vtg7jt.png"
            onClick={handleDelete}
          />
        </>
      )}

      {modal ? (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Comment</ModalHeader>
          <ModalBody>
            <form className="col-8 offset-2 text-left">
              <fieldset>
                <label htmlFor="comment"> Comment </label>
                <input
                  type="text"
                  name="content"
                  className="form-control"
                  placeholder="content"
                  ref={content}
                  defaultValue={props.comment.content}
                  required
                  autoFocus
                />
              </fieldset>
              <Button onClick={handleEdit}>Post</Button>
            </form>
          </ModalBody>
        </Modal>
      ) : null}
    </div>
  );
}
