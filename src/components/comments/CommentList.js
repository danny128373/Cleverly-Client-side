import React, { useState, useEffect, useRef } from "react";
import ApiManager from "../../api/ApiManager";
import CommentCard from "./CommentCard";
import { ModalHeader, Modal, ModalBody, Button } from "reactstrap";
// import "../communities/community.css";
import "./comment.css";

export default function CommentList(props) {
  const [comments, setComments] = useState([
    { post: {}, profile: { user: {} } },
  ]);
  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState({ user: {} });
  const comment = useRef();

  const getComments = () => {
    ApiManager.getComments().then((comments) => {
      const commentsByPost = comments.filter(
        (comment) => comment.post.id === props.postId
      );
      setComments(commentsByPost);
    });
  };

  const getProfile = () => {
    ApiManager.getCurrentUser().then((profile) => {
      setProfile(profile[0]);
    });
  };

  const toggle = () => {
    setModal(!modal);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment === "") {
      alert("Comment section is empty. ");
    } else {
      const newComment = {
        content: comment.current.value,
        profile_id: profile.id,
        post_id: props.postId,
      };
      ApiManager.postNewComment(newComment)
        .then(getComments)
        .then(setModal(!modal));
    }
  };

  useEffect(getComments, [props.postId]);
  useEffect(getProfile, []);

  return (
    <>
      {comments.map((comment) => (
        <CommentCard
          key={`card--${comment.id}`}
          getComments={getComments}
          comment={comment}
          profile={profile}
          postId={props.postId}
          {...props}
        />
      ))}

      <button className="labelFile" onClick={toggle}>
        Post a comment?
      </button>
      {modal ? (
        <Modal className="commentModalContainer" isOpen={modal} toggle={toggle}>
          <ModalHeader className="commentTitle" toggle={toggle}>
            Write a Comment!
          </ModalHeader>
          <form className="">
            <div>
              <textarea
                ref={comment}
                type="text"
                name="comment"
                rows="4"
                maxLength="512"
                className="commentInput"
                placeholder="Add a comment"
                required
                autoFocus
              />
            </div>
            <button className="labelFile" onClick={submitHandler}>
              Post
            </button>
          </form>
        </Modal>
      ) : null}
    </>
  );
}
