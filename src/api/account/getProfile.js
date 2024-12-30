import { URL } from "../../constants/url"


export const getProfile =  () => {
    const res = fetch(`${URL}/api/account/profile`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}