import { URL } from "../../constants/url"


export const getPost=  () => {
    const res = fetch(`${URL}/api/post${window.location.search}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}