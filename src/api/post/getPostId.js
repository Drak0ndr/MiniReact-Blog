import { URL } from "../../constants/url"


export const getPostId=  (id) => {
    const res = fetch(`${URL}/api/post/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}