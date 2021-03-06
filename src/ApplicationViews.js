import React, { useState, useRef, useEffect } from "react";
import { Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import Main from "./components/home/Main";
import CommunityList from "./components/communities/CommunityList";
import PostForm from "./components/posts/PostForm";
import PostTextForm from "./components/posts/PostTextForm";
import CommunityForm from "./components/communities/CommunityForm";
import Account from "./components/accounts/Account";
import PostList from "./components/posts/PostList";
import PostDetail from "./components/posts/PostDetail";
import ApiManager from "./api/ApiManager";
import SearchResultsCommunity from "./components/communities/SearchResultsCommunity";
import Searchbar from "./components/home/Searchbar";
import AccountEditForm from "./components/accounts/AccountEditForm";
import PostEditForm from "./components/posts/PostEditForm";
import "./components/home/home.css";
import "./cleverly.css";

export default function ApplicationViews(props) {
  const setIsLogged = props.setIsLogged;
  const search = useRef();
  const [communities, setCommunities] = useState([
    { profile: {}, community: { community: {} } },
  ]);

  const handleSearchSubmit = (e) => {
    ApiManager.getSearchedCommunities(e, search.current.value)
      .then((communities) => {
        setCommunities(communities);
      })
      .then(props.history.push("/search"));
  };

  return (
    <div className="pageContainer">
      <Route
        exact
        path="/login"
        render={(props) => {
          return <Login setIsLogged={setIsLogged} {...props} />;
        }}
      />
      <Route
        exact
        path="/register"
        render={(props) => {
          return <Register setIsLogged={setIsLogged} {...props} />;
        }}
      />
      <Route
        exact
        path="/home"
        render={(props) => {
          return (
            <>
              <div className="appNameContainer">
                <span className="appName">Cleverly</span>
              </div>

              <Searchbar
                handleSearchSubmit={handleSearchSubmit}
                search={search}
                {...props}
              />
              <div className="homeContainer">
                <Home {...props} />
              </div>
            </>
          );
        }}
      />
      <Route
        exact
        path="/"
        render={(props) => {
          return <Main {...props} />;
        }}
      />
      <Route
        exact
        path="/account"
        render={(props) => {
          return <Account setIsLogged={setIsLogged} {...props} />;
        }}
      />
      <Route
        exact
        path="/account/edit/:accountId"
        render={(props) => {
          return (
            <AccountEditForm
              accountId={parseInt(props.match.params.accountId)}
              {...props}
            />
          );
        }}
      />
      <Route
        exact
        path="/communities"
        render={(props) => {
          return <CommunityList {...props} />;
        }}
      />
      <Route
        exact
        path="/communities/:communityId(\d+)"
        render={(props) => {
          return (
            <PostList
              {...props}
              communityId={parseInt(props.match.params.communityId)}
            />
          );
        }}
      />
      <Route
        exact
        path="/posts/:postId(\d+)"
        render={(props) => {
          return (
            <PostDetail
              {...props}
              postId={parseInt(props.match.params.postId)}
            />
          );
        }}
      />
      <Route
        exact
        path="/newpostimage"
        render={(props) => {
          return <PostForm {...props} />;
        }}
      />
      <Route
        exact
        path="/newposttext"
        render={(props) => {
          return <PostTextForm {...props} />;
        }}
      />
      <Route
        exact
        path="/posts/edit/:postId(\d+)"
        render={(props) => {
          return (
            <PostEditForm
              postId={parseInt(props.match.params.postId)}
              {...props}
            />
          );
        }}
      />
      <Route
        exact
        path="/createcommunity"
        render={(props) => {
          return <CommunityForm {...props} />;
        }}
      />
      <Route
        exact
        path="/search"
        render={(props) => {
          return (
            <>
              <div className="appNameContainer">
                <span className="appName">Cleverly</span>
              </div>
              <Searchbar
                handleSearchSubmit={handleSearchSubmit}
                search={search}
                {...props}
              />
              <SearchResultsCommunity communities={communities} {...props} />
            </>
          );
        }}
      />
    </div>
  );
}
