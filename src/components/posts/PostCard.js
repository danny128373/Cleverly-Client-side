import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ApiManager from '../../api/ApiManager'

export default function PostCard (props) {

    const [totalLikes, setTotalLikes] = useState(0)
    const [isUserPost, setIsUserPost] = useState(false)
    const [post, setPost] = useState({profile:{}, content: '', title: ''})
    const [currentUserReaction, setCurrentUserReaction] = useState({id: 0, status:'',post:{}, profile:{user:{}}})
    const [profile, setProfile] = useState({user:{}})

    const getProfile = () => {
        ApiManager.getCurrentUser().then(profile => {
            setProfile(profile[0])
        })
    }
    
    const getAllProfilePostReactions = () => {
        ApiManager.getAll('profilepostreactions')
        .then(profilePostReactions => {
            const currentReaction = profilePostReactions.find(relationship => relationship.profile.id === profile.id && relationship.post.id === props.post.id)
            const likes = profilePostReactions.filter(relationship => props.post.id === relationship.post.id && relationship.status === 'likes')
            const dislikes = profilePostReactions.filter(relationship => props.post.id === relationship.post.id && relationship.status === 'dislikes')
            setTotalLikes(likes.length-dislikes.length)
            if (currentReaction) {
                setCurrentUserReaction(currentReaction)
            } else {
                setCurrentUserReaction({id: 0, status:'',post:{}, profile:{user:{}}})
            }
        })
        .then(getPost)
    }

    const likeHandler = () => {
        if (currentUserReaction.id === 0) {
            ApiManager.post({post_id: post.id, profile_id: props.profile.id, status: 'likes'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        } else if (currentUserReaction.status === 'dislikes') {
            ApiManager.update({id: currentUserReaction.id, post_id: post.id, profile_id: props.profile.id, status: 'likes'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        } else if (currentUserReaction.status === 'likes') {
            ApiManager.update({id: currentUserReaction.id, post_id: post.id, profile_id: props.profile.id, status: 'neutral'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        } else {
            ApiManager.update({id: currentUserReaction.id, post_id: post.id, profile_id: props.profile.id, status: 'likes'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        }
    }

    const dislikeHandler = () => {
        if (currentUserReaction.id === 0) {
            ApiManager.post({post_id: post.id, profile_id: props.profile.id, status: 'dislikes'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        } else if(currentUserReaction.status === 'likes') {
            ApiManager.update({id: currentUserReaction.id, post_id: post.id, profile_id: props.profile.id, status: 'dislikes'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        } else if(currentUserReaction.status === 'dislikes') {
            ApiManager.update({id: currentUserReaction.id, post_id: post.id, profile_id: props.profile.id, status: 'neutral'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        } else {
            ApiManager.update({id: currentUserReaction.id, post_id: post.id, profile_id: props.profile.id, status: 'dislikes'}, 'profilepostreactions')
            .then(getPost)
            .then(getAllProfilePostReactions)
        }
    }

    const getPost = () => {
        ApiManager.get(props.post, 'posts')
        .then(post => {
            setPost(post)
        })
    }

    const checkUserPost = () => {
        if (profile.id === props.post.profile.id && props.post.profile.id !== undefined) {
            setIsUserPost(true)
        } else {
            setIsUserPost(false)
        }
    }

    useEffect(checkUserPost, [isUserPost])
    useEffect(getAllProfilePostReactions, [profile])
    useEffect(getPost, [currentUserReaction])
    useEffect(getProfile, [])
    
    return (
        <>
            <h3>{props.post.title}</h3>
            <p>By: {props.post.profile.user.username}</p>
            <div className='postImageContainer'>
                <img alt='content' className='postImage' src={props.post.content}/>
            </div>
            <p>Likes: {totalLikes}</p>
            {isUserPost ? 
                <>
                <button onClick={likeHandler}>
                    Like
                </button>
                <button onClick={dislikeHandler}>
                    Dislike
                </button>
            </>
            : null}
            <Link to={`/posts/${props.post.id}`}>
                <button>
                    Comments
                </button>
            </Link>
        </>
    )
}