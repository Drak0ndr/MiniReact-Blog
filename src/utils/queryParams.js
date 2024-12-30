import { route } from './route'

export const addQueryParams = (key, value) => {
   const params = getQueryParams()
   params[key] = value
   setQueryParams(params)
}

export const getQueryParams = () => {
   const queryParams = {}
   const params = new URLSearchParams(window.location.search)
   for (const [key, value] of params.entries()) {
      if (queryParams[key]) {
         if (Array.isArray(queryParams[key])) {
            queryParams[key].push(value)
         } else {
            queryParams[key] = [queryParams[key]]
            queryParams[key].push(value)
         }
      } else {
         queryParams[key] = value
      }
   }
   return queryParams
}

export const setQueryParams = (queryParams) => {
   console.log(queryParams)
   let stringParams = '?'
   for (const [key, value] of Object.entries(queryParams)) {
      if (value != '') {
         if (Array.isArray(value)) {
            value.forEach((item) => {
               if (stringParams != '?') {
                  stringParams += '&'
               }
               stringParams += `${key}=${item}`
            })
         } else {
            if (stringParams != '?') {
               stringParams += '&'
            }
            stringParams += `${key}=${value}`
         }
      }
   }
   route(stringParams)
}
