import { URL } from "../../constants/url"

export const getAddressSearch = (parentObjectId, query = '') => {
    const res = fetch(`${URL}/api/address/search?parentObjectId=${parentObjectId}&query=${query}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}