import React, { useState, useEffect, useRef  } from 'react'
import ApiManager from '../../api/ApiManager'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

export default function PostEditForm(props) {

    const [profile, setProfile] = useState({user:{}})
    const title = useRef()
    const content = useRef()  
    const [image, setImage] = useState("")
    const [post, setPost] = useState({})
    const [isImage, setIsImage] = useState(true)

    const isEditPostImage = () => {
        try {
            if (post.content.includes('cloudinary')) {
            setIsImage(true)
        } else {
            setIsImage(false)
        }
        }
        catch(error) {
            //Ignoring since first render post is undefined until useEffect kicks in
        }
    }

    const getPost = () => {
        ApiManager.getPost(props.postId).then(post => {
            setPost(post)
        })
    }

    const uploadImage = async event => {
        const files = event.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'userImage')
        const res = await fetch('https://api.cloudinary.com/v1_1/dp5l2gxzh/image/upload',
          {
            method: 'POST',
            body: data
          }
        )
        const file = await res.json()
        ApiManager.update({ ...post, content: file.url },'posts').then(e => {
            setImage(file.secure_url)   
        })
      }

    const getProfile = () => {
        ApiManager.getCurrentUser().then(profiles => {
            setProfile(profiles[0])
        })
    }

    const updatePost = (e) => {
        e.preventDefault()
        const updatedPost = {
           id: post.id,
           title: title.current.value,
           content: image
        }
        ApiManager.update(updatedPost, 'posts').then(e => {
            props.history.push(`/posts/${post.id}`)
          })
    }

    const updatePostWithText = (e) => {
        e.preventDefault()
        const updatedPost = {
            id: post.id,
            title: title.current.value,
            content: content.current.value
         }
         ApiManager.update(updatedPost, 'posts').then(e => {
             props.history.push(`/posts/${post.id}`)
           })
    }

    useEffect(getProfile, [])
    useEffect(getPost, [])
    useEffect(isEditPostImage, [post])
    

    return (
        <>
        <form>
            <h2>Edit Post</h2>
            <fieldset>
                <label>Title:</label>
                <input id="title"ref={title} type="text" defaultValue={post.title} />
            </fieldset>
        </form>
            
            {isImage ?
            <>
                <img alt='postContent' src={post.content}/>
                <fieldset>
                    <label className="labelFile" htmlFor="file">Upload Picture:</label>
                <input
                    id="file"
                    type="file"
                    name="file"
                    placeholder="Upload Image"
                    onChange={uploadImage}
                />
                </fieldset>
                <Link><Button id="profileEditSubmitButton" onClick={updatePost}>Submit Changes</Button></Link>

            </>
            : 
            <>
                <fieldset>
                    <label>Content:</label>
                    <input id="content" ref={content} type="text" defaultValue={post.content} />
                </fieldset>
                <Link><Button id="profileEditSubmitButton" onClick={updatePostWithText}>Submit Changes</Button></Link>
            </>
            
            }
        </>
    )
}