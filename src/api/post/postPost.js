import { URL } from "../../constants/url"


export const postPost=  (data) => {
    const res = fetch(`${URL}/api/post`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    })

    return res
}