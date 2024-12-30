import { URL } from "../../constants/url"


export const deleteLike=  (id) => {
    const res = fetch(`${URL}/api/post/${id}/like`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}