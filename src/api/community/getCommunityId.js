import { URL } from "../../constants/url"


export const getCommunityId =  (id) => {
    const res = fetch(`${URL}/api/community/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}