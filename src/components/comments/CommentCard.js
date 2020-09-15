import React, { useState, useEffect } from 'react'
import ApiManager from '../../api/ApiManager'

export default function CommentCard(props) {

    const [isUserComment, setIsUserComment] = useState(false)

    const handleDelete = () => {
        ApiManager.delete(props.comment.id, 'comments').then()
        .then(props.getComments)
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
                <button onClick={handleDelete}>
                    Delete
                </button>
            : null}
            
        </div>
    )
}