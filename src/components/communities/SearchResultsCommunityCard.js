import React from 'react'

export default function SearchResultsCommunityCard(props) {
    return (
        <div>
            <img alt="pic" src={props.community.image} />
            <p>{props.community.name}</p>
        </div>
    )
}