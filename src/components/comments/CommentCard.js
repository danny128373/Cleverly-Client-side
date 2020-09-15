import React, { useState, useEffect, useRef } from 'react'
import ApiManager from '../../api/ApiManager'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'

export default function CommentCard(props) {

    const [isUserComment, setIsUserComment] = useState(false)
    const content = useRef()
    const [modal, setModal] = useState(false)

    const handleDelete = () => {
        ApiManager.delete(props.comment.id, 'comments').then()
        .then(props.getComments)
    }

    const toggle = () => {
        setModal(!modal)
    }

    const handleEdit = (e) => {
        e.preventDefault()
        const editedComment = {
            ...props.comment,
            content: content.current.value,
            id: props.comment.id 
        }
        ApiManager.update(editedComment, 'comments').then()
        .then(props.getComments).then(setModal(!modal))
    }

    const checkUserComment = () => {
        if (props.profile.id === props.comment.profile.id && props.comment.profile.id != undefined) {
            setIsUserComment(true)
        } else {
            setIsUserComment(false)
        }
    }

    useEffect(checkUserComment, [isUserComment])

    return (
        <div>
            <p>{props.comment.profile.user.username}</p>
            <p>{props.comment.content}</p>
            <button>
                Like
            </button>
            <button>
                Dislike
            </button>
            {isUserComment ? 
                <>
                    <button onClick={toggle}>
                        Edit
                    </button>
                    <button onClick={handleDelete}>
                        Delete
                    </button>
                </>
            : null}
            {modal ?
            <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Comment</ModalHeader>
            <ModalBody>
            <form className="col-8 offset-2 text-left">
                <fieldset>
                    <label htmlFor="comment"> Comment </label>
                    <input 
                        type="text"
                        name="content"
                        className="form-control"
                        placeholder="content"
                        ref={content}
                        defaultValue={props.comment.content}
                        required autoFocus />
                </fieldset>
                <Button onClick={handleEdit}>
                    Post
                </Button>
            </form>
            </ModalBody>
          </Modal>
        :null}
            
        </div>
    )
}