import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import './navbar.css'

function Navbar(props) {

    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }
    

    return (
        <ul className="navbar fixed-bottom">
            <li><Link to="/home" className="navLink"><img alt='homeIcon' className='navbarIcons' src='https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600453761/1_xruokg.png'/></Link></li>
            <li><Link to="/communities" className="navLink"><img alt='communityIcon' className='navbarIcons' src='https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600452637/Navbar_icons_1_kolfi2.png'/></Link></li>
            <li><Link to="/newpost" className="navLink" onClick={toggle}><img alt='postIcon' className='navbarIcons' src='https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600454817/Navbar_icons_3_vka5x7.png'/></Link></li>
            <li><Link to="/messages" className="navLink"><img alt='messagesIcon' className='navbarIcons' src='https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600454725/8_gwnrik.png'/></Link></li>
            <li><Link to="/account" className="navLink"><img alt='accountIcon' className='navbarIcons' src='https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600454906/10_xtfvii.png'/></Link></li>

            {modal ?
            <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Select Meme Format</ModalHeader>
            <ModalBody>
            <form className="col-8 offset-2 text-left">
                <div className="form-group">
                    <Link to="/newpostimage" onClick={() => {
                        setModal(false)
                    }} toggle={toggle}><img src="" alt="Image"/></Link>
                    <Link 
                        to="/newposttext" 
                        onClick={() => {
                            setModal(false)
                        }} 
                        toggle={toggle}>
                        <img src="" alt="Text"/>
                    </Link>
                </div>
            </form>
            </ModalBody>
          </Modal>
        :null}
        </ul>
    )
}
export default withRouter(Navbar)