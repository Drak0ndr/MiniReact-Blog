import { URL } from "../../constants/url"


export const deleteComment =  (id) => {
    const res = fetch(`${URL}/api/comment/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    })

    return res
}