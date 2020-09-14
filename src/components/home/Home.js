import React, { useState, useEffect } from 'react'
import ApiManager from '../../api/ApiManager'
import PostCard from '../posts/PostCard'

export default function Home(props) {

    const [posts, setPosts] = useState([{content:"", likes:"", created_at:"",community:{}, profile:{user:{}}}])

   
    const getPosts = () => {
        ApiManager.getPosts().then(posts => setPosts(posts))
    }

    useEffect(getPosts, [])

    return (
        <>
            {posts.map(post => <PostCard {...props} post={post}/>)}
        </>
    )
}