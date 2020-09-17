import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ReactDOM from 'react-dom'
import Cleverly from './Cleverly'
import 'bootstrap/dist/css/bootstrap.min.css'


ReactDOM.render(
  <Router>
    <Cleverly />
  </Router>,
  document.getElementById('root')
)