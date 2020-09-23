import ApiManager from "../../api/ApiManager";
import PostCard from "./PostCard";

import React, { useState, useEffect } from "react";

export default function PostList(props) {
  const [posts, setPosts] = useState([
    {
      id: "",
      content: "",
      likes: "",
      created_at: "",
      community: {},
      profile: { user: {} },
    },
  ]);

  const getPosts = () => {
    /**
     * Fetches all posts of the current community
     */
    ApiManager.getPosts().then((posts) => {
      const postsByCommunity = posts.filter(
        (post) => post.community.id === props.communityId
      );
      setPosts(postsByCommunity);
    });
  };

  useEffect(getPosts, []);

  return (
    <div className="postListContainer">
      {posts.map((post) => (
        <PostCard key={post.id} getPosts={getPosts} post={post} {...props} />
      ))}
    </div>
  );
}
