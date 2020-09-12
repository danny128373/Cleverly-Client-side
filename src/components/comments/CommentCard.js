import React from 'react'

export default function CommentCard(props) {
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
        </div>
    )
}