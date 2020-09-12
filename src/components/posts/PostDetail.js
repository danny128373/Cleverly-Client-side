import React, { useState, useEffect } from 'react'
import ApiManager from '../../api/ApiManager'
import CommentList from '../comments/CommentList'

export default function PostDetail(props) {

    const [post, setPost] = useState({profile:{user:{}}})

    const getPost = () => {
        ApiManager.getPost(props.postId).then(post => {
            setPost(post)
        })
    }

    useEffect(getPost,[])

    return (
        <>
            <h2>{post.title}</h2>
            <p>By: {post.profile.user.username}</p>
            <p>{post.content}</p>
            <h3>Comments</h3>
            <CommentList {...props}/>
        </>
    )
}