import React, {useState, useEffect} from 'react'
import { Button } from "reactstrap"
import ApiManager from '../../api/ApiManager'

export default function Account(props) {

    const [profile, setProfile] = useState({user:{}})
    const [image, setImage] = useState("")
    
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
        
            ApiManager.update({ ...profile, profile_image: file.url },'profiles').then(e => {
                setImage(file.secure_url)
        })
      }

    const getProfile = () => {
        ApiManager.getCurrentUser().then(profiles => {
            setProfile(profiles[0])
        })
    }

    useEffect(getProfile, [image])

    return (
        <>
            <h1>Account Details</h1>
            <img alt='profile image' src={profile.profile_image}/>
            <label className="labelFile" htmlFor="file">
                Upload Picture
            <input
            id="file"
            type="file"
            name="file"
            placeholder="Upload Image"
            onChange={uploadImage}
            />
            </label>
            <h3>{profile.first_name} {profile.user.last_name}</h3>
            <p>{profile.about}</p>
            <p>{profile.likes}</p>
            <p>{profile.user.date_joined}</p>
            <Button>Friend Requests</Button>
            <Button>Friends</Button>
        </>
    )
}