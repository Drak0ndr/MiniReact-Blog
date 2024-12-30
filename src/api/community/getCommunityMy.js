import { URL } from "../../constants/url"


export const getCommunityMy =  () => {
    const res = fetch(`${URL}/api/community/my`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}