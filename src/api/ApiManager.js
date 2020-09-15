const remoteURL = "http://localhost:8000"

export default {
    getCommunities() {
        return fetch(`${remoteURL}/profilecommunities`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("cleverly_token")}`
            }
        })
            .then(response => response.json())
    },
    getAllCommunities() {
        return fetch(`${remoteURL}/communities`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("cleverly_token")}`
            }
        })
            .then(response => response.json())
    },
    getSearchedCommunities(event, search) {
        return fetch(`${remoteURL}/communities?search=${search}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("cleverly_token")}`
            }
        })
            .then(response => response.json())
    },
    getPosts() {
        return fetch(`${remoteURL}/posts`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("cleverly_token")}`
            }
        })
            .then(response => response.json())
    },
    getComments() {
        return fetch(`${remoteURL}/comments`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("cleverly_token")}`
            }
        })
            .then(response => response.json())
    },
    getCurrentUser() {
        return fetch(`${remoteURL}/profiles`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("cleverly_token")}`
            }
        })
            .then(response => response.json())
    },
    getPost(postId) {
        return fetch(`${remoteURL}/posts/${postId}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("cleverly_token")}`
            }
        })
            .then(response => response.json())
    },
    postNewPost(post) {
        return fetch(`${remoteURL}/posts`, {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem('cleverly_token')}`
            },
            body: JSON.stringify(post)
        })
    },
    postNewComment(comment) {
        return fetch(`${remoteURL}/comments`, {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem('cleverly_token')}`
            },
            body: JSON.stringify(comment)
        })
    },
    postNewCommunity(community) {
        return fetch(`${remoteURL}/communities`, {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem('cleverly_token')}`
            },
            body: JSON.stringify(community)
        })
    },
    postNewProfileCommunity(community) {
        return fetch(`${remoteURL}/profilecommunities`, {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem('cleverly_token')}`
            },
            body: JSON.stringify(community)
        })
    },
    update(object, collection) {
        return fetch(`${remoteURL}/${collection}/${object.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem('cleverly_token')}`
            },
            body: JSON.stringify(object)
        })  
    },
    delete(id, collection) {
        return fetch(`${remoteURL}/${collection}/${id}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Token ${localStorage.getItem("cleverly_token")}`
            }
        })
    }
}