import React from 'react'
import CommunityCard from './CommunityCard'
import SearchResultsCommunityCard from './SearchResultsCommunityCard'

export default function SearchResultsCommunity(props)  {

    return (
        <div>
            {props.communities.map(community => <SearchResultsCommunityCard {...props} community={community}/>)}
        </div>
    )
}