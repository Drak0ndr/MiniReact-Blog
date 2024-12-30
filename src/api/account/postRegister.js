import { URL } from "../../constants/url"


export const postRegister =  (fullName, birthDate, gender,phoneNumber, email, password) => {
    const res = fetch(`${URL}/api/account/register`, {
        method: 'POST',
        body: JSON.stringify({fullName, birthDate: birthDate ? birthDate : null, gender, phoneNumber: phoneNumber ? phoneNumber : null, email, password}),
        headers: {
            "Content-Type": "application/json",
        }
    })

    return res
}