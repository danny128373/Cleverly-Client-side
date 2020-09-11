import React from 'react'
import { withRouter, Link } from 'react-router-dom'

function Navbar(props) {
    return (
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/communities">communities</Link></li>
            <li><Link to="/newpost">Post</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="/account">Account</Link></li>
        </ul>
    )
}
export default withRouter(Navbar)