import React, { useState, useEffect, useRef } from "react";
import ApiManager from "../../api/ApiManager";
import PostCard from "../posts/PostCard";

export default function Home(props) {
  const [posts, setPosts] = useState([
    {
      id: 0,
      content: "",
      likes: "",
      created_at: "",
      community: {},
      profile: { user: {} },
    },
  ]);

  const getPosts = () => {
    /**
     * Grabs all posts from CleverlyAPI, API only fetches posts of the community which the user is following.
     */
    ApiManager.getPosts().then((posts) => {
      setPosts(posts);
    });
  };

  useEffect(getPosts, []);

  return (
    <>
      {posts.reverse().map((post) => (
        <PostCard key={post.id} {...props} post={post} />
      ))}
    </>
  );
}
