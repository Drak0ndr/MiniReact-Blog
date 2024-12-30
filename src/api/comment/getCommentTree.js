import { URL } from "../../constants/url"

export const getCommentTree = (id) => {
    const res = fetch(`${URL}/api/comment/${id}/tree`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}