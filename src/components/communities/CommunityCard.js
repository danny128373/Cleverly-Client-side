import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ApiManager from "../../api/ApiManager";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import "./community.css";

export default function CommunityCard(props) {
  const [modal, setModal] = useState(false);
  const name = useRef();
  const description = useRef();
  const [image, setImage] = useState("");

  const handleDelete = () => {
    ApiManager.delete(props.community.community.id, "communities").then(
      props.getCommunities
    );
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedCommunity = {
      ...props.community.community,
      name: name.current.value,
      description: description.current.value,
    };
    ApiManager.update(updatedCommunity, "communities")
      .then(props.getCommunities)
      .then(setModal(!modal));
  };

  const uploadImage = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "userImage");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dp5l2gxzh/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    ApiManager.update(
      { ...props.community.community, image: file.url },
      "communities"
    ).then((e) => {
      setImage(file.secure_url);
    });
  };

  useEffect(props.getCommunities, [image]);

  return (
    <>
      <div className="communityCardContainer">
        <div
          onClick={() =>
            props.history.push(`communities/${props.community.community.id}`)
          }
          className="communityClickable"
        >
          <p className="communityTitle">#{props.community.community.name}</p>
          <div className="communityImageContainer">
            <img
              className="communityImage"
              alt="community"
              src={props.community.community.image}
            />
          </div>

          <p>{props.community.community.description}</p>
        </div>

        <table className="communityIconTable">
          <th>
            {props.community.community.profile === props.profile.id ? (
              <>
                <td>
                  <img
                    onClick={toggle}
                    alt="edit community"
                    className="communityIcons"
                    src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600701613/Navbar_icons_12_nhdgeb.png"
                  />
                </td>
                <td>
                  <img
                    onClick={handleDelete}
                    alt="delete community"
                    className="communityIcons"
                    src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600701849/Navbar_icons_13_vtg7jt.png"
                  />
                </td>
              </>
            ) : null}
          </th>
        </table>
      </div>

      {modal ? (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Community</ModalHeader>
          <ModalBody>
            <form className="col-8 offset-2 text-left">
              {props.community.community.profile === props.profile.id ? (
                <input
                  id="file"
                  type="file"
                  name="file"
                  placeholder="Upload Image"
                  onChange={uploadImage}
                />
              ) : null}
              <fieldset>
                <label htmlFor="comment"> Name </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="name"
                  ref={name}
                  defaultValue={props.community.community.name}
                  required
                />
              </fieldset>
              <fieldset>
                <label htmlFor="comment"> Description </label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="description"
                  ref={description}
                  defaultValue={props.community.community.description}
                  required
                />
              </fieldset>
              <Button onClick={handleEdit}>Post</Button>
            </form>
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
}
