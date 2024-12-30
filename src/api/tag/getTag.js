import { URL } from "../../constants/url"

export const getTag = () => {
    const res = fetch(`${URL}/api/tag`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}