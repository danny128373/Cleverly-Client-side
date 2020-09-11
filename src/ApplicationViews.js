import React from 'react'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { Route } from 'react-router-dom'

export default function ApplicationViews(props) {

    const setIsLogged = props.setIsLogged

    return (
        <>
        <Route
                exact
                path="/login"
                render={props => {
                    return <Login setIsLogged={setIsLogged} {...props} />
                }}
            />
        <Route
            exact
            path='/register'
            render={props => {
                return <Register setIsLogged={setIsLogged} {...props} />
            }}
        />
        </>

    )
}