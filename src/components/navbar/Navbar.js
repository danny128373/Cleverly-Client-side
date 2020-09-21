import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./navbar.css";

function Navbar(props) {
  const [modal, setModal] = useState(false);
  const [onHome, setOnHome] = useState(true);
  const [onCommunity, setOnCommunity] = useState(false);
  const [onPost, setOnPost] = useState(false);
  const [onMessages, setOnMessages] = useState(false);
  const [onAccount, setOnAccount] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <ul className="navbar fixed-bottom">
      {onHome ? (
        <li>
          <Link to="/home" className="navLink">
            <img
              alt="homeIcon"
              className="navbarIcons"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600475622/1_cd4jsb.png"
            />
          </Link>
        </li>
      ) : (
        <li>
          <Link to="/home" className="navLink">
            <img
              onClick={() => {
                setOnHome(true);
                setOnCommunity(false);
                setOnPost(false);
                setOnMessages(false);
                setOnAccount(false);
              }}
              alt="homeIcon"
              className="navbarIcons"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600475622/2_akjsjr.png"
            />
          </Link>
        </li>
      )}

      {onCommunity ? (
        <li>
          <Link to="/communities" className="navLink">
            <img
              alt="communityIcon"
              className="navbarIcons"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600475622/4_tvog7u.png"
            />
          </Link>
        </li>
      ) : (
        <li>
          <Link to="/communities" className="navLink">
            <img
              onClick={() => {
                setOnHome(false);
                setOnCommunity(true);
                setOnPost(false);
                setOnMessages(false);
                setOnAccount(false);
              }}
              alt="communityIcon"
              className="navbarIcons"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600475622/3_jjdsuy.png"
            />
          </Link>
        </li>
      )}

      {onPost ? (
        <li>
          <Link to="/newpost" className="navLink" onClick={toggle}>
            <img
              alt="postIcon"
              className="navbarIcons"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600639449/19_blidrh.png"
            />
          </Link>
        </li>
      ) : (
        <li>
          <Link to="/newpost" className="navLink" onClick={toggle}>
            <img
              onClick={() => {
                setOnHome(false);
                setOnCommunity(false);
                setOnPost(true);
                setOnMessages(false);
                setOnAccount(false);
              }}
              alt="postIcon"
              className="navbarIcons"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600639449/18_uyoxfd.png"
            />
          </Link>
        </li>
      )}

      {onMessages ? (
        <li>
          <Link to="/messages" className="navLink">
            <img
              alt="messagesIcon"
              className="navbarIcons"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600475622/8_squfdf.png"
            />
          </Link>
        </li>
      ) : (
        <li>
          <Link to="/messages" className="navLink">
            <img
              onClick={() => {
                setOnHome(false);
                setOnCommunity(false);
                setOnPost(false);
                setOnMessages(true);
                setOnAccount(false);
              }}
              alt="messagesIcon"
              className="navbarIcons"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600475622/7_xkyhcr.png"
            />
          </Link>
        </li>
      )}

      {onAccount ? (
        <li>
          <Link to="/account" className="navLink">
            <img
              alt="accountIcon"
              className="navbarIcons"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600475622/10_jbbeoo.png"
            />
          </Link>
        </li>
      ) : (
        <li>
          <Link to="/account" className="navLink">
            <img
              onClick={() => {
                setOnHome(false);
                setOnCommunity(false);
                setOnPost(false);
                setOnMessages(false);
                setOnAccount(true);
              }}
              alt="accountIcon"
              className="navbarIcons"
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600475622/9_t1v7yq.png"
            />
          </Link>
        </li>
      )}

      {modal ? (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Select Meme Format</ModalHeader>
          <ModalBody>
            <form className="col-8 offset-2 text-left">
              <div className="form-group">
                <Link
                  to="/newpostimage"
                  onClick={() => {
                    setModal(false);
                  }}
                  toggle={toggle}
                >
                  <img src="" alt="Image" />
                </Link>
                <Link
                  to="/newposttext"
                  onClick={() => {
                    setModal(false);
                  }}
                  toggle={toggle}
                >
                  <img src="" alt="Text" />
                </Link>
              </div>
            </form>
          </ModalBody>
        </Modal>
      ) : null}
    </ul>
  );
}
export default withRouter(Navbar);
