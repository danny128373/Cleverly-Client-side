import React, { useState, useEffect, useRef } from 'react'
import ApiManager from '../../api/ApiManager'
import PostCard from '../posts/PostCard'
import SearchResultsCommunityCard from '../communities/SearchResultsCommunityCard'

export default function Home(props) {

    const search = useRef()
    const [communities, setCommunities] = useState([{profile:{}, community:{community:{}}}])
    const [posts, setPosts] = useState([{content:"", likes:"", created_at:"",community:{}, profile:{user:{}}}])

   
    const getPosts = () => {
        ApiManager.getPosts().then(posts => setPosts(posts))
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        ApiManager.getSearchedCommunities(search.current.value).then(results => {
            setCommunities(results)
        }).then((event) => {ApiManager.getSearchedCommunities(event, search.current.value).then(
            props.history.push('/search')
        )})
    }

    useEffect(getPosts, [])

    return (
        <>
            <h1>Welcome to Cleverly!</h1>
            <form>
                <fieldset>
                    <label htmlFor='search'>Search for Communities!</label>
                    <input type='text' id='search' name='search' ref={search} placeholder='Search communities'/>
                    <button type='submit' onClick={handleSearchSubmit}>Search</button>
                </fieldset>
            </form>
            {posts.map(post => <PostCard {...props} post={post}/>)}
            
            {communities.map(community => <SearchResultsCommunityCard community={community} {...props}/>)}
           
        </>
    )
}