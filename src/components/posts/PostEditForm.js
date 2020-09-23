import React, { useState, useEffect, useRef } from "react";
import ApiManager from "../../api/ApiManager";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../accounts/account.css";

export default function PostEditForm(props) {
  const [profile, setProfile] = useState({ user: {} });
  const title = useRef();
  const content = useRef();
  const [image, setImage] = useState("");
  const [post, setPost] = useState({});
  const [isImage, setIsImage] = useState(true);

  const isEditPostImage = () => {
    /**
     * Checks if post content is an image.
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

  const getPost = () => {
    /**
     * Grabs post info
     */
    ApiManager.getPost(props.postId).then((post) => {
      setPost(post);
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
    ApiManager.update({ ...post, content: file.url }, "posts").then((e) => {
      setImage(file.secure_url);
    });
  };

  const getProfile = () => {
    /**
     * Grabs current user
     */
    ApiManager.getCurrentUser().then((profiles) => {
      setProfile(profiles[0]);
    });
  };

  const updatePost = (e) => {
    /**
     * Updates current post with user changes
     */
    e.preventDefault();
    const updatedPost = {
      id: post.id,
      title: title.current.value,
      content: image,
    };
    ApiManager.update(updatedPost, "posts").then((e) => {
      props.history.push(`/posts/${post.id}`);
    });
  };

  const updatePostWithText = (e) => {
    /**
     * Updates current post with user changes
     */
    e.preventDefault();
    const updatedPost = {
      id: post.id,
      title: title.current.value,
      content: content.current.value,
    };
    ApiManager.update(updatedPost, "posts").then((e) => {
      props.history.push(`/posts/${post.id}`);
    });
  };

  useEffect(getProfile, []);
  useEffect(getPost, []);
  useEffect(isEditPostImage, [post]);

  return (
    <>
      <form className="postFormContainer">
        <h1>Edit Post</h1>
        <fieldset>
          <div>
            <label>Title:</label>
          </div>
          <textarea
            id="title"
            ref={title}
            type="text"
            row="4"
            maxLength="512"
            className="postTitleTextArea"
            defaultValue={post.title}
          />
        </fieldset>
        {isImage ? (
          <>
            <img alt="postContent" className="postImage" src={post.content} />
            <fieldset>
              <label className="labelFile" htmlFor="file">
                Upload Picture
              </label>
              <input
                id="file"
                type="file"
                name="file"
                placeholder="Upload Image"
                onChange={uploadImage}
              />
            </fieldset>
            <button
              className="labelFile"
              id="profileEditSubmitButton"
              onClick={updatePost}
            >
              Submit Changes
            </button>
          </>
        ) : (
          <>
            <fieldset>
              <label>Content:</label>
              <textarea
                id="content"
                rows="4"
                className="postTitleTextArea"
                maxLength="512"
                ref={content}
                type="text"
                defaultValue={post.content}
              />
            </fieldset>
            <Link>
              <button
                id="profileEditSubmitButton"
                className="labelFile"
                onClick={updatePostWithText}
              >
                Submit Changes
              </button>
            </Link>
          </>
        )}
      </form>
    </>
  );
}
