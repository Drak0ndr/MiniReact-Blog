import { URL } from "../../constants/url"

export const getAuthors = () => {
    const res = fetch(`${URL}/api/author/list`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}