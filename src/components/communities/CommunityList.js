import React, { useState, useEffect } from 'react'
import ApiManager from '../../api/ApiManager'
import CommunityCard from './CommunityCard'

export default function CommunityList(props) {

    const [communities, setCommunities] = useState([{profile:{}}])
    const [profile, setProfile] = useState({})

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

    useEffect(getProfile, [])
    useEffect(getCommunities, [profile])

    return (
        <>
            {communities.map(community => <CommunityCard key={community.id} community={community}/>)}
        </>
    )
}