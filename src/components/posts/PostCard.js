import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function PostCard (props) {
    const consolesProps = () => {
        console.log('props', props)
    }
    
    useEffect(consolesProps, [])
    return (
        <>
            <h3>{props.post.title}</h3>
            <p>By: {props.post.profile.user.username}</p>
            <p>{props.post.content}</p>
        <Link to={`/posts/${props.post.id}`}>
            <button>
                Comments
            </button>
        </Link>
        </>
    )
}