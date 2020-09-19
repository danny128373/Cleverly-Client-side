import React from "react";
import SearchResultsCommunityCard from "./SearchResultsCommunityCard";

export default function SearchResultsCommunity(props) {
  return (
    <div>
      {props.communities.map((community) => (
        <SearchResultsCommunityCard
          {...props}
          communities={props.communities}
          community={community}
        />
      ))}
    </div>
  );
}
