import { getCommunity } from '../../api/community/getCommunity'
import { getCommunityMy } from '../../api/community/getCommunityMy'
import { Community } from '../../components/Community/CommunityCard'
import { Layout } from '../../components/Layout/Layout'

import styles from './Communities.module.css'

const Communities = async () => {
   const res = await getCommunity()
   const communities = await res.json()
   const myNormalData = {}

   if (localStorage.getItem('token')) {
      const myRes = await getCommunityMy()
      const myData = await myRes.json()

      myData.forEach((item) => {
         myNormalData[item.communityId] = item
      })
   }
   
   return (
      <Layout>
         <div class={styles.page}>
            {communities.map((item) => (
               <Community
                  id={item.id}
                  name={item.name}
                  role={myNormalData[item.id] ? myNormalData[item.id].role : ''}
               />
            ))}
         </div>
      </Layout>
   )
}

export default Communities
