import React, {useState} from 'react'
import {Route} from 'react-router-dom'
import ApplicationViews from './ApplicationViews'
import Navbar from './components/navbar/Navbar'

function Cleverly(props) {

  const [isLogged, setIsLogged] = useState(false)

  return (
    <>
      <Route render={props => (
                <Navbar {...props} isLogged={isLogged} setIsLogged={setIsLogged} />
            )} />
      <ApplicationViews isLogged={isLogged} setIsLogged={setIsLogged} {...props}/>
    </>
  )    
}

export default Cleverly

