export const checkUrl = (url, template) => {
   const urlArr = url.split('/')
   const pathArr = template.split('/')
   if (urlArr.length == pathArr.length) {
      let flag = true
      for (let i = 0; i < urlArr.length; i++) {
         if (!(urlArr[i] == pathArr[i] || pathArr[i][0] == ':')) {
            flag = false
         }
      }
      if (flag) {
         return true
      }
   }

   return false
}
