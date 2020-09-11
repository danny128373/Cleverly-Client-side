import React, {useState, useEffect} from 'react'
import { Button } from "reactstrap"
import ApiManager from '../../api/ApiManager'

export default function Account(props) {

    const [profile, setProfile] = useState({user:{}})

    const getProfile = () => {
        ApiManager.getCurrentUser().then(profiles => {
            setProfile(profiles[0])
        })
    }

    useEffect(getProfile, [])

    return (
        <>
            <h1>Account Details</h1>
            <h3>{profile.first_name} {profile.user.last_name}</h3>
            <p>{profile.about}</p>
            <p>{profile.likes}</p>
            <p>{profile.user.date_joined}</p>
            <Button>Friend Requests</Button>
            <Button>Friends</Button>
        </>
    )
}