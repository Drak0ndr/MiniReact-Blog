import { Link } from '../../../miniReact/components/Link/Link.jsx'
import { deleteCommunityUnsubscribe } from '../../api/community/deleteCommunityUnsubscribe'
import { getCommunityId } from '../../api/community/getCommunityId.js'
import { getCommunityIdPost } from '../../api/community/getCommunityIdPost'
import { getCommunityMy } from '../../api/community/getCommunityMy'
import { postCommunitySubscribe } from '../../api/community/postCommunitySubscribe'
import { getTag } from '../../api/tag/getTag'
import { Article } from '../../components/Article/Article'
import { Layout } from '../../components/Layout/Layout'
import { IconUser } from '../../icons/iconUser'
import { IconUserFemale } from '../../icons/IconUserFemale'
import { IconUserMale } from '../../icons/IconUserMale'
import { Button } from '../../ui/Button/Button'
import { FormElement } from '../../ui/FormElement/FormElement'
import { NotificationSystem } from '../../ui/NotificationSystem/NotificationSystem'
import { PageSize } from '../../ui/PageSize/PageSize'
import { Pagination } from '../../ui/Pagination/Pagination'
import { addQueryParams, getQueryParams } from '../../utils/queryParams'
import { route } from '../../utils/route'

import styles from './Community.module.css'

const unSubscribe = async (e) => {
   const id = e.target.closest('[data-communityId]').dataset.communityid
   const res = await deleteCommunityUnsubscribe(id)

   if (res.status == 401) {
      NotificationSystem.show('Вы не авторизованы', 'error')
   } else if (res.status != 200) {
      NotificationSystem.show('Что-то пошло не так', 'error')
   } else {
      NotificationSystem.show('Вы отписались от группы', 'succes')
      route('')
   }
}

const subscribe = async (e) => {
   const id = e.target.closest('[data-communityId]').dataset.communityid
   const res = await postCommunitySubscribe(id)

   if (res.status == 401) {
      NotificationSystem.show('Вы не авторизованы', 'error')
   } else if (res.status != 200) {
      NotificationSystem.show('Что-то пошло не так', 'error')
   } else {
      NotificationSystem.show('Вы подписались на группу', 'succes')
      route('')
   }
}

const loadSortHandler = (e) => {
   e.target.value = getQueryParams()['sorting'] || 'CreateDesc'
}

const loadTagsHandler = (e) => {
   const activeOptions = getQueryParams()['tags']

   if (activeOptions) {
      Array.from(e.target.options).forEach((item) => {
         if (activeOptions.includes(item.value)) {
            item.selected = true
         }
      })
   }
}

const subminHandler = (e) => {
   e.preventDefault()
   const formData = new FormData(e.target)
   const tags = []
   let onlyMyCommunities = false

   for (const [key, value] of formData.entries()) {
      console.log(key, value)
      if (key == 'onlyMyCommunities') {
         onlyMyCommunities = true
      }
      if (key == 'tags') {
         tags.push(value)
      } else {
         addQueryParams(key, value)
      }
   }

   addQueryParams('tags', tags)
   if (!onlyMyCommunities) {
      addQueryParams('onlyMyCommunities', onlyMyCommunities)
   }
   addQueryParams('page', 1)
}

const Community = async () => {
   const communityId = window.location.pathname.split('/')[2]
   const communityRes = await getCommunityId(communityId)
   const communityData = await communityRes.json()
   const myNormalData = {}

   if (localStorage.getItem('token')) {
      const myRes = await getCommunityMy()
      const myData = await myRes.json()

      myData.forEach((item) => {
         myNormalData[item.communityId] = item
      })
      
   }

   const communityPostRes = await getCommunityIdPost(communityId)
   let communityPostData = {
      posts: [],
      pagination: {}
   }

   if (communityPostRes.status == 200) {
      communityPostData = await communityPostRes.json()
   }

   
   const searchTagRes = await getTag()
   const searchTags = await searchTagRes.json()

   return (
      <Layout>
         <section class={styles.section} data-communityId={communityData.id}>
            <div class={styles.head_continer}>
               <h2>Группа "{communityData.name}"</h2>
               <div class={styles.buttons_container}>
                  {localStorage.getItem('token') &&
                  myNormalData[communityId] &&
                  myNormalData[communityId].role == 'Administrator' ? (
                     <Link href={`/post/create?group=${communityId}`}>
                        <Button size="small">Написать пост</Button>
                     </Link>
                  ) : (
                     ''
                  )}

                  {myNormalData[communityId] && myNormalData[communityId].role == 'Subscriber' ? (
                     <Button size="small" variant="red" onClick={unSubscribe}>
                        Отписаться
                     </Button>
                  ) : myNormalData[communityId] && myNormalData[communityId].role == 'Administrator' ? (
                     ''
                  ) : (
                     <Button size="small" onClick={subscribe}>
                        Подписаться
                     </Button>
                  )}
               </div>
            </div>
            <div class={styles.stat_item}>
               <IconUser />
               <span>{communityData.subscribersCount} подписчиков</span>
            </div>
            <p>Тип сообщества {communityData.isClosed ? 'закрытое' : 'открытое'}</p>
            <h3>Администраторы</h3>
            {communityData.administrators.map((item) => (
               <div class={styles.admin}>
                  {item.gender == 'Male' ? <IconUserMale /> : <IconUserFemale />}

                  <span style={'word-break: break-all;flex:1'}>{item.fullName}</span>
               </div>
            ))}
         </section>
         {communityPostData.posts.length > 0 ? (
            <section class={styles.filters}>
               <div class={styles.filters_title}>
                  <p>Фильтры</p>
               </div>
               <form class={styles.form} onSubmit={subminHandler}>
                  <div class={styles.filters_sort}>
                     <FormElement title="Сортировать">
                        <select name="sorting" onLoadElement={loadSortHandler}>
                           <option value="CreateDesc">По дате создания (сначала новые)</option>
                           <option value="CreateAsc">По дате создания (сначала старые)</option>
                           <option value="LikeDesc">По лайкам (сначала много)</option>
                           <option value="LikeAsc">По лайкам (сначала мало)</option>
                        </select>
                     </FormElement>
                     <FormElement title="Поиск по тэгам">
                        <select name="tags" multiple onLoadElement={loadTagsHandler}>
                           {searchTags.map((item) => (
                              <option value={item.id}>{item.name}</option>
                           ))}
                        </select>
                     </FormElement>
                  </div>

                  <div class={styles.right}>
                     <Button size="small">Применить</Button>
                  </div>
               </form>
            </section>
         ) : (
            ''
         )}

         <section>
            {communityPostData.posts.map((item) => (
               <Article
                  id={item.id}
                  author={item.author}
                  create={item.createTime}
                  communityName={item.communityName}
                  title={item.title}
                  description={item.description}
                  img={item.image}
                  tags={item.tags}
                  readingTime={item.readingTime}
                  comments={item.commentsCount}
                  likes={item.likes}
                  hasLiked={item.hasLike}
               />
            ))}
         </section>
         {communityPostData.posts.length > 0 ? (
            <div class={styles.pages}>
               <Pagination total={communityPostData.pagination.count} />
               <PageSize title="Количество постов на странице" options={[5, 10]} />
            </div>
         ) : (
            ''
         )}
      </Layout>
   )
}

export default Community
