import React, {useState} from 'react'
import {Route, withRouter} from 'react-router-dom'
import ApplicationViews from './ApplicationViews'
import Navbar from './components/navbar/Navbar'
import Main from './components/home/Main'

function Cleverly(props) {

  const [isLogged, setIsLogged] = useState(false)

  return (
    <>
    {isLogged ?
    <Route render={props => {
      return <Navbar {...props} isLogged={isLogged} setIsLogged={setIsLogged} />
    }} />
    : null}
      <ApplicationViews isLogged={isLogged} setIsLogged={setIsLogged} {...props}/>
    </>
  )    
}

export default withRouter(Cleverly)

