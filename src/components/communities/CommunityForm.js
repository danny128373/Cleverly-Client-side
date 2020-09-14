import React, { useRef, useState, useEffect } from 'react'
import ApiManager from '../../api/ApiManager'

export default function CommunityForm (props) {

    const name = useRef()
    const description = useRef()
    const [profile, setProfile] = useState({user:{}})
    const [image, setImage] = useState("")

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const community = {
            name: name.current.value,
            image: image,
            description: description.current.value,
            profile_id: profile.id
        }
        ApiManager.postNewCommunity(community)
        .then(props.history.push("/communities"))
    }

    const uploadImage = async event => {
        const files = event.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'userImage')
        const res = await fetch('https://api.cloudinary.com/v1_1/dp5l2gxzh/image/upload',
          {
            method: 'POST',
            body: data
          }
        )
        const file = await res.json()
        setImage(file.secure_url)
      }

    const getProfile = () => {
        ApiManager.getCurrentUser().then(profiles => {
            setProfile(profiles[0])
        })
    }

    useEffect(getProfile, [])

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
                    <input onChange={uploadImage} id='image' type="file"
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