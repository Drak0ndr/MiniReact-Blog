import { URL } from "../../constants/url"


export const postCommunityIdPost =  (id, data) => {
    const res = fetch(`${URL}/api/community/${id}/post`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    })

    return res
}