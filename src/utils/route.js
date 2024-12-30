import { ROUTES } from "../constants/routes";
import Home from "../pages/Home/Home";

 export const routeLink = (event) => {
    const href = event.target.href || event.target.closest('a[data-link]').href
    event.preventDefault();
    window.history.pushState({}, "", href);
    handleLocation();
 };

export const route = (href = '', func) => {
    window.history.pushState({}, "", href);
    handleLocation(func);
}

const loadPage = async (path, func) => {
    const Route = await (await ROUTES[path]()).default ;
    const Elem = await <Route />

    document.querySelector("#app").innerHTML = ''

    if ([Elem][0][0]) {
        [Elem][0].forEach(item => {
            document.querySelector("#app").appendChild(item)
        })
    } else {
        // document.querySelector("#app").appendChild(<Route />);
        document.querySelector("#app").append(Elem);
    }
    // try {
    //     document.querySelector("#app").appendChild(<Route />);
    // } catch {
    //     document.querySelector("#app").append(...<Route />);
    // }
    if (typeof func === 'function') {
        func()
    }
    
}


export const handleLocation = async (func) => {
    const path = window.location.pathname;

    if (ROUTES[path]) {
        loadPage(path)
    } else {
        const pathArr = path.split('/')
        console.log(pathArr)
        let pagePath = '/404'
        for (let [key, value] of Object.entries(ROUTES)) {
            const keyArr = key.split('/')
            if (keyArr.length == pathArr.length) {
                console.log(keyArr)
                let flag = true
                for (let i = 0; i< keyArr.length; i++) {
                    if (!(keyArr[i] == pathArr[i] || keyArr[i][0] == ':')) {
                        flag = false
                    }
                }
                if (flag) {
                    pagePath = key
                    break
                }
            }

        }
        loadPage(pagePath, func)
    }

};

