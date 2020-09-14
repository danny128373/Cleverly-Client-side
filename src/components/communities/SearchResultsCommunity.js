import React from 'react'
import CommunityCard from './CommunityCard'
import SearchResultsCommunityCard from './SearchResultsCommunityCard'

export default function SearchResultsCommunity(props)  {

    return (
        <>
            <SearchResultsCommunityCard communities={props.communities} {...props}/>
        </>
    )
}