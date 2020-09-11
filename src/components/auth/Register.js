import React, { useRef } from 'react'
import { withRouter } from "react-router-dom"
import useSimpleAuth from '../../hooks/useSimpleAuth'


function Register(props) {
    const email = useRef()
    const userName = useRef()
    const lastName = useRef()
    const password = useRef()
    const firstName = useRef()
    const image = useRef()
    const about = useRef()
    const verifyPassword = useRef()
    const { register } = useSimpleAuth()

    const handleRegister = (e) => {
        e.preventDefault()
        props.setIsLogged(false)
        const newUser = {
            "username": userName.current.value,
            "first_name": firstName.current.value,
            "last_name": lastName.current.value,
            "email": email.current.value,
            "password": password.current.value,
            "about": about.current.value,
            "profile_image":image.current.value,
            "likes": 0
        }

        register(newUser).then(() => {
            props.setIsLogged(true)
            props.history.push('/')
        })
    }

    return (
        <form className="form--login" onSubmit={handleRegister}>
            <h1 className="h3 mb-3 font-weight-normal">Register to use Cleverly</h1>
            <fieldset>
                <label htmlFor="userName"> Username </label>
                <input ref={userName} type="text"
                    name="userName"
                    className="form-control"
                    placeholder="Username"
                    required autoFocus />
            </fieldset>
            <fieldset>
                <label htmlFor="firstName"> First Name </label>
                <input ref={firstName} type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First name"
                    required autoFocus />
            </fieldset>
            <fieldset>
                <label htmlFor="lastName"> Last Name </label>
                <input ref={lastName} type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last name"
                    required />
            </fieldset>
            <fieldset>
                <label htmlFor="inputEmail"> Email address </label>
                <input ref={email} type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    required />
            </fieldset>
            <fieldset>
                <label htmlFor="about"> About </label>
                <input ref={about} type="text"
                    name="about"
                    className="form-control"
                    placeholder="About"
                    required />
            </fieldset>
            <fieldset>
                <label htmlFor="image"> Profile Image </label>
                <input ref={image} type="text"
                    name="image"
                    className="form-control"
                    placeholder="Profile Image"
                    required />
            </fieldset>
            <fieldset>
                <label htmlFor="inputPassword"> Password </label>
                <input ref={password} type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    required />
            </fieldset>
            <fieldset>
                <label htmlFor="verifyPassword"> Verify Password </label>
                <input ref={verifyPassword} type="password"
                    name="verifyPassword"
                    className="form-control"
                    placeholder="Verify password"
                    required />
            </fieldset>
            <fieldset>
                <button type="submit">
                    Register
                    </button>
            </fieldset>
        </form>
    )
}
export default withRouter(Register)