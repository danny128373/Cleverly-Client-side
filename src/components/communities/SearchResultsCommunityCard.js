import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchResultsCommunityCard(props) {
    return (
        <>
        <div>
            <img alt="pic" src={props.community.image}/>
            <p>{props.community.name}</p>
            <p>{props.community.description}</p>
        </div>
            
            <Link to={`communities/${props.community.id}`}>
            <button>
                Go to community!
            </button>
            </Link>
        </>
    )
}