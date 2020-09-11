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
    }
}