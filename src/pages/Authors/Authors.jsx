import { Link } from '../../../miniReact/components/Link/Link'
import { getAuthors } from '../../api/Author/getAuthors'
import { Layout } from '../../components/Layout/Layout'
import { IconCrown } from '../../icons/IconCrown'
import { IconUserFemale } from '../../icons/IconUserFemale'
import { IconUserMale } from '../../icons/IconUserMale'

import styles from './Authors.module.css'
const Authors = async () => {
   const res = await getAuthors()
   const data = await res.json()
   const topAuthors = data
      .map((item) => item)
      .sort((a, b) => {
         if (a.posts > b.posts) return -1
         else if (a.posts < b.posts) return 1
         else if (a.posts == b.posts) {
            if (a.likes > b.likes) return -1
            else return 1
         }
      })
      .slice(0, 3)
      .map((item) => item.fullName)
   
   return (
      <Layout>
         <section>
            {data.map((item) => (
               <Link href={`/?author=${item.fullName}`}>
                  <div class={styles.author}>
                     <div class={styles.author_item}>
                        <div style="position:relative">
                           {item.gender == 'Male' ? <IconUserMale /> : <IconUserFemale />}{' '}
                           <div style="position:absolute; transform: rotate(25deg); right:0;top: -20px; z-index:10">
                              {topAuthors[0] == item.fullName ? (
                                 <IconCrown fill="yellow" />
                              ) : topAuthors[1] == item.fullName ? (
                                 <IconCrown fill="gainsboro" />
                              ) : topAuthors[2] == item.fullName ? (
                                 <IconCrown fill="gray" />
                              ) : (
                                 ''
                              )}
                           </div>
                        </div>

                        <div class={styles.info}>
                           <p>
                              <span style={'font-weight:bold; word-break: break-word;'}>{item.fullName}</span>{' '}
                              <span style="color:gray">
                                 Создан: {item.created.substring(0, 10).split('-').reverse().join('.')}
                              </span>
                           </p>
                           <p>
                              <span style="color:gray; font-weight:bold">Дата рождения:</span>{' '}
                              {item.birthDate
                                 ? item.birthDate.substring(0, 10).split('-').reverse().join('.')
                                 : 'неизвестна'}
                           </p>
                        </div>
                     </div>
                     <div class={styles.author_item} style="min-width: fit-content;">
                        <span class={styles.stats}>Посты : {item.posts}</span>
                        <span class={styles.stats}>Лайки : {item.likes}</span>
                     </div>
                  </div>
               </Link>
            ))}
         </section>
      </Layout>
   )
}

export default Authors
