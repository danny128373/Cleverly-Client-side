import React from 'react'
import { Link } from 'react-router-dom'
export default function CommunityCard(props) {
    return (
        <>
        <div>
            <img alt="pic" src={props.community.community.image}/>
            <p>{props.community.community.name}</p>
            <p>{props.community.community.description}</p>
        </div>
            
            <Link to={`communities/${props.community.community.id}`}>
            <button>
                Go to community!
            </button>
            </Link>
        </>
    )
}