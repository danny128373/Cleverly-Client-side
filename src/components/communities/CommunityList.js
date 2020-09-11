import React, { useState, useEffect } from 'react'
import ApiManager from '../../api/ApiManager'
import CommunityCard from './CommunityCard'
import { Button } from 'reactstrap'

export default function CommunityList(props) {

    const [communities, setCommunities] = useState([{profile:{}, community:{}}])
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
        <Button onClick={()=>props.history.push('/createcommunity')}>
            Create Community
        </Button>
        {communities.map(community => <CommunityCard key={community.id} community={community}/>)}
        </>
    )
}