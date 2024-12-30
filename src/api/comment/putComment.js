import { URL } from "../../constants/url"


export const putComment =  (id, data) => {
    const res = fetch(`${URL}/api/comment/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    })

    return res
}