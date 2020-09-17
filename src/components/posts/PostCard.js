import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function PostCard (props) {

    const [totalLikes, setTotalLikes] = useState(0)

    
    return (
        <>
            <h3>{props.post.title}</h3>
            <p>By: {props.post.profile.user.username}</p>
            <div className='postImageContainer'>
                <img alt='content' className='postImage' src={props.post.content}/>
            </div>
    <p>{totalLikes}</p>
        <Link to={`/posts/${props.post.id}`}>
            <button>
                Comments
            </button>
        </Link>
        </>
    )
}