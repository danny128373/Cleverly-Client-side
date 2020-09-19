import React, { useState, useEffect, useRef } from "react";
import ApiManager from "../../api/ApiManager";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

export default function CommentCard(props) {
  const [isUserComment, setIsUserComment] = useState(false);
  const content = useRef();
  const [modal, setModal] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
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
        setTotalLikes(likes.length - dislikes.length);
        if (currentStatus) {
          setCurrentUserCommentRelationship(currentStatus);
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
    <div>
      <p>{props.comment.profile.user.username}</p>
      <p>{props.comment.content}</p>
      {!isUserComment ? (
        <>
          <button onClick={likeHandler}>Like</button>
          <button onClick={dislikeHandler}>Dislike</button>
        </>
      ) : null}

      {isUserComment ? (
        <>
          <button onClick={toggle}>Edit</button>

          <button onClick={handleDelete}>Delete</button>
        </>
      ) : null}
      <p>Number of likes: {totalLikes}</p>
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
