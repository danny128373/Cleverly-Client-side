import React, { useRef, useState, useEffect } from 'react'
import ApiManager from '../../api/ApiManager'

export default function CommunityForm (props) {

    const name = useRef()
    const image = useRef()
    const description = useRef()
    const [profile, setProfile] = useState({})

    const getProfile = () => {
        ApiManager.getCurrentUser().then(profile => {
            setProfile(profile[0])
        })
    }

    useEffect(getProfile, [])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const community = {
            name: name.current.value,
            image: image.current.value,
            description: description.current.value,
            profile_id: profile.id
        }
        
        ApiManager.postNewCommunity(community)
        .then(props.history.push("/communities"))
    }

    return (
        <>
            <main style={{ textAlign: "center" }}>
            <form className="form--login">
                <h1 className="h3 mb-3 font-weight-normal">Create a Community!</h1>
                <fieldset>
                    <label htmlFor="name"> name </label>
                    <input ref={name} type="text"
                        name="name"
                        className="form-control"
                        placeholder="name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="image">Image</label>
                    <input ref={image} id='image' type="text"
                        name="image"
                        className="form-control"
                        placeholder="image"
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="description">description</label>
                    <input ref={description} id='description' type="text"
                        name="description"
                        className="form-control"
                        placeholder="description"
                    />
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