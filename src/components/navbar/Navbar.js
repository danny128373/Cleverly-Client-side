import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

function Navbar(props) {

    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
      }
    

    return (
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/communities">Communities</Link></li>
            <li><Link to="/newpost" onClick={toggle}>Post</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="/account">Account</Link></li>

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