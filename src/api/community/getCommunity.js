import { URL } from "../../constants/url"


export const getCommunity =  () => {
    const res = fetch(`${URL}/api/community`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}