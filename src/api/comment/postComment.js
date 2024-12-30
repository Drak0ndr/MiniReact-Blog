import { URL } from "../../constants/url"


export const postComment =  (id, data) => {
    const res = fetch(`${URL}/api/post/${id}/comment`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    })

    return res
}