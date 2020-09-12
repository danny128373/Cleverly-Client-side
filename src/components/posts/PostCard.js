import React from 'react'

export default function PostCard (props) {
    return (
        <>
            <h3>{props.post.title}</h3>
            <p>By: {props.post.profile.user.username}</p>
            <p>{props.post.content}</p>
            <button>Comments</button>
        </>
    )
}