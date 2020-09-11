import React from 'react'
import { Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/home/Home'
import Main from './components/home/Main'


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
        <Route
            exact
            path='/home'
            render={props => {
                return <Home setIsLogged={setIsLogged} {...props} />
            }}
        />
        <Route
            exact
            path='/'
            render={props => {
                return <Main setIsLogged={setIsLogged} {...props} />
            }}
        />
        </>

    )
}