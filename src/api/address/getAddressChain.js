import { URL } from "../../constants/url"

export const getAddressChain = (objectId) => {
    const res = fetch(`${URL}/api/address/chain?objectGuid=${objectId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}