import { URL } from "../../constants/url"


export const putProfile =  (email, fullName, phoneNumber, gender, birthDate) => {
    const res = fetch(`${URL}/api/account/profile`, {
        method: 'PUT',
        body: JSON.stringify({email, fullName, phoneNumber: phoneNumber ? phoneNumber : null, gender, birthDate: birthDate ? birthDate : null}),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res
}