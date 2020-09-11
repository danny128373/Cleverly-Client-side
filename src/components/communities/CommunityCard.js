import React from 'react'
export default function CommunityCard(props) {
    return (
        <>
            <img alt="pic" src={props.community.community.image}/>
            <p>{props.community.community.name}</p>
            <p>{props.community.community.description}</p>
        </>
    )
}