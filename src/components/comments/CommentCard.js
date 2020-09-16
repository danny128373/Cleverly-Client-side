import React, { useState, useEffect, useRef } from 'react'
import ApiManager from '../../api/ApiManager'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'

export default function CommentCard(props) {

    const [isUserComment, setIsUserComment] = useState(false)
    const content = useRef()
    const [modal, setModal] = useState(false)
    const [commentLikes, setCommentLikes] = useState(0)
    const [showLike, setShowLike] = useState(true)
    const [profilelikescomment, setProfileLikesComment] = useState([])

    const toggle = () => {
        setModal(!modal)
    }

    const handleDelete = () => {
        ApiManager.delete(props.comment.id, 'comments').then()
        .then(props.getComments)
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

    const likeHandler = () => {
        ApiManager.post({profile_id: props.profile.id, comment_id: props.comment.id, status:'like'}, 'profilelikescomments').then(getCommentLikes)
    }

    const unlikeHandler = (e) => {
        try {
            if (profilelikescomment.id != undefined) {
                ApiManager.delete(profilelikescomment.id, 'profilelikescomments').then(getCommentLikes)
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    const checkUserComment = () => {
        if (props.profile.id === props.comment.profile.id && props.comment.profile.id != undefined) {
            setIsUserComment(true)
        } else {
            setIsUserComment(false)
        }
    }

    const getCommentLikes = () => {
        ApiManager.getAll('profilelikescomments').then(commentLikes => {
            const isLikedByCurrentUser = commentLikes.filter(commentLike => commentLike.profile.id === props.profile.id && commentLike.comment.id === props.comment.id)
            const totalLikesForComment = commentLikes.filter(commentLike => commentLike.comment.id === props.comment.id) 
            setCommentLikes(totalLikesForComment.length)
            if (isLikedByCurrentUser.length > 0) {
                setShowLike(false)
                setProfileLikesComment(isLikedByCurrentUser)
            }
        })
    }

    useEffect(checkUserComment, [isUserComment])
    useEffect(getCommentLikes, [])

    return (
        <div>
            <p>{props.comment.profile.user.username}</p>
            <p>{props.comment.content}</p>
            {showLike ? 
                <button onClick={likeHandler}>
                    Like
                </button>
            : 
                <button onClick={unlikeHandler}>
                    Unlike
                </button>
            }
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
            <p>Number of likes: {commentLikes}</p>
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