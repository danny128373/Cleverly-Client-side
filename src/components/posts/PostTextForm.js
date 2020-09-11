import React, { useRef, useState, useEffect } from 'react'
import ApiManager from '../../api/ApiManager'

export default function PostTextForm (props) {

    const title = useRef()
    const content = useRef()
    const [communities, setCommunities] = useState([{profile:{}}])
    const [communityId, setCommunityId] = useState({ community_id: "" })
    const [profile, setProfile] = useState({})
    const [isValid, setIsValid] = useState(false)

    const getProfile = () => {
        ApiManager.getCurrentUser().then(profile => {
            setProfile(profile[0])
        })
    }

    const getCommunities = () => {
        ApiManager.getCommunities().then(communities => {
        const communitiesByUser = communities.filter(community => community.profile.id === profile.id)
        setCommunities(communitiesByUser)
        })
    }

    const handleCommunityChange = (event) => {
        const stateToChange = { ...communityId }
        stateToChange[event.target.id] = event.target.value
        const community = communities.filter(community => community.name === stateToChange[event.target.id])
        stateToChange.community_id = community[0].id
        setCommunityId(stateToChange)
        setIsValid(true)
    }

    useEffect(getProfile, [])
    useEffect(getCommunities, [profile])

    const onSubmitHandler = (e) => {
        if (isValid) {
            const post = {
                title: title.current.value,
                content: content.current.value,
                community_id: communityId.community_id,
                profile_id: profile.id
            }
            ApiManager.postNewPost(post).then(e => {
            })
            props.history.push("/communities")
        } else {
            e.preventDefault()
            alert("Please select the community you want to post to!")
        }
    }

    return (
        <>
            <main style={{ textAlign: "center" }}>
            <form className="form--login">
                <h1 className="h3 mb-3 font-weight-normal">Post a Meme!</h1>
                <fieldset>
                    <label htmlFor="title"> title </label>
                    <input ref={title} type="text"
                        name="title"
                        className="form-control"
                        placeholder="title"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="content">Content</label>
                    <input ref={content} id='content' type="text"
                        name="content"
                        className="form-control"
                        placeholder="Content"
                    />
                </fieldset>
                <fieldset>
                    <select required onChange={handleCommunityChange} id="communityId">
                        <option>Select Community</option>
                        {communities.map(community => <option key={community.id}>{community.name}</option>)}
                    </select>
                </fieldset>
                <fieldset>
                    <button onClick={onSubmitHandler}>
                        Post
                    </button>
                </fieldset>
            </form>
        </main>
        </>
    )
}