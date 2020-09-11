import React from 'react'
import { Button } from 'reactstrap'

export default function Main(props) {
    return (
        <div>
            <h1>Cleverly</h1>
            <img alt="" src=""/>
            <p>Super awesome slogan for Cleverly.</p>
            <Button onClick={() => props.history.push('/register')}>
                Register
            </Button>
            <p>Already have an account?</p>
            <Button onClick={() => props.history.push('/login')}>
                Login
            </Button>
        </div>
    )
}