import { URL } from "../../constants/url"


export const deleteCommunityUnsubscribe =  (id) => {
    const res = fetch(`${URL}/api/community/${id}/unsubscribe`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}