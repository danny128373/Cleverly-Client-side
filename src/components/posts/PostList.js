import ApiManager from "../../api/ApiManager"

import React, {useState, useEffect} from 'react'

export default function PostList (props) {

    const [posts, setPosts] = useState([])

    const getPosts = () => {
        ApiManager.getPosts(posts => {
            setPosts(posts)
        })
    }

    useEffect(getPosts, [])

    return (
        <>

        </>
    )
}