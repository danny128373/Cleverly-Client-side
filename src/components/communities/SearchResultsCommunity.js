import React from "react";
import SearchResultsCommunityCard from "./SearchResultsCommunityCard";

export default function SearchResultsCommunity(props) {
  return (
    <div className="communityListContainer">
      {props.communities.map((community) => (
        <SearchResultsCommunityCard
          key={community.id}
          {...props}
          communities={props.communities}
          community={community}
        />
      ))}
    </div>
  );
}
