import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function PostCard (props) {
    
    return (
        <>
            <h3>{props.post.title}</h3>
            <p>By: {props.post.profile.user.username}</p>
            <img alt='content' src={props.post.content}/>
        <Link to={`/posts/${props.post.id}`}>
            <button>
                Comments
            </button>
        </Link>
        </>
    )
}