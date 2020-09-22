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

      <button onClick={toggle}>Post a comment?</button>
      {modal ? (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Write a Comment!</ModalHeader>
          <ModalBody>
            <form className="col-8 offset-2 text-left">
              <fieldset>
                <label htmlFor="comment"> Comment </label>
                <input
                  ref={comment}
                  type="text"
                  name="comment"
                  className="form-control"
                  placeholder="comment"
                  required
                  autoFocus
                />
              </fieldset>
              <Button onClick={submitHandler}>Post</Button>
            </form>
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
}
