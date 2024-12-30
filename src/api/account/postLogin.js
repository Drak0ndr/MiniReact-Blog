import { URL } from "../../constants/url"


export const postLogin =  (email, password) => {
    const res = fetch(`${URL}/api/account/login`, {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
            "Content-Type": "application/json",
        }
    })

    return res
}