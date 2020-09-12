import ApiManager from "../../api/ApiManager"
import PostCard from './PostCard'

import React, {useState, useEffect} from 'react'

export default function PostList (props) {

    const [posts, setPosts] = useState([{community:{}, profile:{user:{}}}])

    const getPosts = () => {
        ApiManager.getPosts().then(posts => {
            const postsByCommunity = posts.filter(post => post.community.id === props.communityId)
            setPosts(postsByCommunity)
        })
    }

    useEffect(getPosts, [])

    return (
        <>
            {posts.map(post => <PostCard {...props} post={post} />)}
        </>
    )
}