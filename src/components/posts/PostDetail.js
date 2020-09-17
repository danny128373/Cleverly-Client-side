import React, { useState, useEffect } from 'react'
import ApiManager from '../../api/ApiManager'
import CommentList from '../comments/CommentList'

export default function PostDetail(props) {

    const [post, setPost] = useState({profile:{user:{}}, community:{profile:{user:{}}}})
    const [profile, setProfile] = useState({user:{}})
    const [isImage, setIsImage] = useState(true)

    const isEditPostImage = () => {
        try {
            if (post.content.includes('cloudinary')) {
            setIsImage(true)
        } else {
            setIsImage(false)
        }
        }
        catch(error) {
            //Ignoring since first render post is undefined until useEffect kicks in
        }
    }

    const handleDelete = () => {
        ApiManager.delete(props.postId, 'posts')
        .then(props.history.push(props.history.goBack()))
    }

    const getPost = () => {
        ApiManager.getPost(props.postId).then(post => {
            setPost(post)
        })
    }

    const getProfile = () => {
        ApiManager.getCurrentUser().then(profiles => {
            setProfile(profiles[0])
        })
    }

    const onClickHandler = () => {
        props.history.push(`/posts/edit/${props.postId}`)
    }

    useEffect(getProfile, [])
    useEffect(getPost,[])
    useEffect(isEditPostImage, [post])

    return (
        <>
            <h2>Title: {post.title}</h2>
            <p>By: {post.profile.user.username}</p>
            <p>Community: {post.community.name}</p>
            {isImage ?
            <img alt='postContent' src={post.content}/>
            : <h4>{post.content}</h4>}
            <h3>Comments</h3>
            {post.profile.id === profile.id ?
            <>
                <button onClick={onClickHandler} >Edit Post</button>
                <button onClick={handleDelete}>Delete</button>
            </>
            : null}
            <CommentList {...props} postId={props.postId}/>
        </>
    )
}