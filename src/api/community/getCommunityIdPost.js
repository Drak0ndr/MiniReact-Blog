import { URL } from "../../constants/url"


export const getCommunityIdPost =  (id) => {
    const res = fetch(`${URL}/api/community/${id}/post${window.location.search}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}