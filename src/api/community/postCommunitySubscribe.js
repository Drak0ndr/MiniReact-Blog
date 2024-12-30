import { URL } from "../../constants/url"


export const postCommunitySubscribe =  (id) => {
    const res = fetch(`${URL}/api/community/${id}/subscribe`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}