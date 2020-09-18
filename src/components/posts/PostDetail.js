import React, { useState, useEffect } from 'react'
import ApiManager from '../../api/ApiManager'
import CommentList from '../comments/CommentList'

export default function PostDetail(props) {

    const [post, setPost] = useState({id: 0, content: '', title: '', profile:{id: 0, user:{}}, community:{profile:{user:{}}}})
    const [profile, setProfile] = useState({user:{}})
    const [isImage, setIsImage] = useState(true)
    const [totalLikes, setTotalLikes] = useState(0)
    const [currentUserReaction, setCurrentUserReaction] = useState({id: 0, status:'',post:{}, profile:{user:{}}})
    const [isUserPost, setIsUserPost] = useState(false)

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

    const likeHandler = () => {
        if (currentUserReaction.id === 0) {
            ApiManager.post({post_id: post.id, profile_id: profile.id, status: 'likes'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        } else if (currentUserReaction.status === 'dislikes') {
            ApiManager.update({id: currentUserReaction.id, post_id: post.id, profile_id: profile.id, status: 'likes'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        } else if (currentUserReaction.status === 'likes') {
            ApiManager.update({id: currentUserReaction.id, post_id: post.id, profile_id: profile.id, status: 'neutral'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        } else {
            ApiManager.update({id: currentUserReaction.id, post_id: post.id, profile_id: profile.id, status: 'likes'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        }
    }

    const dislikeHandler = () => {
        if (currentUserReaction.id === 0) {
            ApiManager.post({post_id: post.id, profile_id: profile.id, status: 'dislikes'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        } else if(currentUserReaction.status === 'likes') {
            ApiManager.update({id: currentUserReaction.id, post_id: post.id, profile_id: profile.id, status: 'dislikes'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        } else if(currentUserReaction.status === 'dislikes') {
            ApiManager.update({id: currentUserReaction.id, post_id: post.id, profile_id: profile.id, status: 'neutral'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        } else {
            ApiManager.update({id: currentUserReaction.id, post_id: post.id, profile_id: profile.id, status: 'dislikes'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        }
    }

    const checkUserPost = () => {
        if (profile.id === post.profile.id && profile.id !== undefined) {
            setIsUserPost(true)
        } else {
            setIsUserPost(false)
        }
    }

    const getAllProfilePostReactions = () => {
        ApiManager.getAll('profilepostreactions')
        .then(profilePostReactions => {
            const currentReaction = profilePostReactions.find(relationship => relationship.profile.id === profile.id && relationship.post.id === post.id)
            const likes = profilePostReactions.filter(relationship => post.id === relationship.post.id && relationship.status === 'likes')
            const dislikes = profilePostReactions.filter(relationship => post.id === relationship.post.id && relationship.status === 'dislikes')
            setTotalLikes(likes.length-dislikes.length)
            if (currentReaction) {
                setCurrentUserReaction(currentReaction)
            } else {
                setCurrentUserReaction({id: 0, status:'',post:{}, profile:{user:{}}})
            }
        })
        .then(getPost)
    }

    useEffect(checkUserPost, [isUserPost, profile])
    useEffect(getPost,[currentUserReaction])
    useEffect(isEditPostImage, [post])
    useEffect(getAllProfilePostReactions, [profile])
    useEffect(getProfile, [])

    return (
        <>
            <h2>Title: {post.title}</h2>
            <p>By: {post.profile.user.username}</p>
            <p>Community: {post.community.name}</p>
            {isImage ?
            <img alt='postContent' src={post.content}/>
            : <h4>{post.content}</h4>}
            <p>Likes: {totalLikes}</p>
            {!isUserPost ? 
                <>
                <button onClick={likeHandler}>
                    Like
                </button>
                <button onClick={dislikeHandler}>
                    Dislike
                </button>
            </>
            : null}
            {post.profile.id === profile.id ?
            <>
                <button onClick={onClickHandler} >Edit Post</button>
                <button onClick={handleDelete}>Delete</button>
            </>
            : null}
            <h3>Comments</h3>
            <CommentList {...props} postId={props.postId}/>
        </>
    )
}