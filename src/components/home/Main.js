import React from 'react'

export default function Main(props) {
    return (
        <div>
            <h1>Cleverly</h1>
            <img alt="" src=""/>
            <p>Super awesome slogan for Cleverly.</p>
            <button onClick={() => props.history.push('/register')}>
                Register
            </button>
            <p>Already have an account?</p>
            <button onClick={() => props.history.push('/login')}>
                Login
            </button>
        </div>
    )
}