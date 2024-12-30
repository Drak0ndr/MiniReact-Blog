import { URL } from "../../constants/url"


export const postLogout =  () => {
    const res = fetch(`${URL}/api/account/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    
    return res
}