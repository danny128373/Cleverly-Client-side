import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import ApiManager from '../../api/ApiManager'
import { Button } from 'reactstrap'

export default function AccountEditForm(props) {
    // try useref for this editttttttttt

    const [profile, setProfile] = useState({user:{}})
    const first_name = useRef()
    const last_name = useRef()

    const getProfile = () => {
        ApiManager.getCurrentUser().then(profiles => {
            setProfile(profiles[0])
        })
    }

    useEffect(getProfile, [])

    const handleFieldChange = evt => {
        const stateToChange = { ...profile }
        stateToChange[evt.target.id] = evt.target.value;
        setProfile(stateToChange)
      }

      const updateProfile = () => {
        const stateToPost = {
            ...profile,
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            about: profile.about
        }
        console.log(stateToPost)
        ApiManager.update(stateToPost, 'profiles').then(e => {
          props.history.push('/account')
        })
      }

    return (
        <>
            <form>
                <fieldset>
                    <label>First Name:</label>
                    <input id="firstName" ref={first_name} type="text" defaultValue={profile.user.first_name} />
                </fieldset>
                <fieldset>
                    <label>Last Name:</label>
                    <input id="lastName" ref={last_name} type="text" defaultValue={profile.user.last_name} />
                </fieldset>
                <fieldset>
                    <label>About:</label>
                    <input id="about" onChange={handleFieldChange} type="text" defaultValue={profile.about} />
                </fieldset>
                <Link><Button id="profileEditSubmitButton" onClick={updateProfile}>Submit Changes</Button></Link>
            </form>
        </>
    )
}