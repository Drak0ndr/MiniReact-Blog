import { URL } from "../../constants/url"


export const postLike=  (id) => {
    const res = fetch(`${URL}/api/post/${id}/like`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}