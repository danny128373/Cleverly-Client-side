import React from 'react'
export default function CommunityCard(props) {
    return (
        <>
            <img alt="pic" src={props.community.image}/>
            <p>{props.community.name}</p>
            <p>{props.community.description}</p>
        </>
    )
}