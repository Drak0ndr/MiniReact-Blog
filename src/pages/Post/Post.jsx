import { getProfile } from '../../api/account/getProfile'
import { getAddressChain } from '../../api/address/getAddressChain'
import { postComment } from '../../api/comment/postComment'
import { getPostId } from '../../api/post/getPostId'
import { Article } from '../../components/Article/Article'
import { Comment } from '../../components/Comment/Comment'
import { Layout } from '../../components/Layout/Layout'
import { Button } from '../../ui/Button/Button'
import { FormElement } from '../../ui/FormElement/FormElement'
import { NotificationSystem } from '../../ui/NotificationSystem/NotificationSystem'
import { route } from '../../utils/route'

import styles from './Post.module.css'

const submitHandler = async (e) => {
   e.preventDefault()
   const formData = new FormData(e.target)
   const data = {}

   for (const [key, value] of formData.entries()) {
      data[key] = value
   }

   const res = await postComment(window.location.pathname.split('/')[2], data)

   if (res.status == 200) {
      NotificationSystem.show('Вы успешно прокоментировали запись', 'succes')
      route('')
   } else if (res.status == 403) {
      NotificationSystem.show('У вас нет прав, возможно вы не являетесь подписчиком группы', 'error')
   } else if (res.status == 401) {
      NotificationSystem.show('Вы не авторизованы', 'error')
   } else {
      NotificationSystem.show('Что-то пошло не так', 'error')
   }
}
const Post = async () => {
   const postId = window.location.pathname.split('/')[2]
   const res = await getPostId(postId)
   const data = await res.json()
   const addressRes = await getAddressChain(data.addressId)
   let addressList = []

   if (addressRes.status == 200) {
      addressList = await addressRes.json()
   }

   let userId = ''
   const profileRes = await getProfile()

   if (profileRes.status == 200) {
      const profileData = await profileRes.json()
      userId = profileData.id
   }

   return (
      <Layout>
         <Article
            id={postId}
            author={data.author}
            create={data.createTime}
            communityName={data.communityName}
            title={data.title}
            img={data.image}
            description={data.description}
            tags={data.tags}
            readingTime={data.readingTime}
            comments={data.commentsCount}
            likes={data.likes}
            hasLiked={data.hasLike}
            fullRead={true}
            address={addressList.map((item) => item.text).join(', ')}
         />
         {data.comments.length > 0 ? (
            <section class={styles.section}>
               <p class={styles.title}>Коментарии</p>
               <div class={styles.comments}>
                  {data.comments.map((item) => (
                     <Comment
                        id={item.id}
                        author={item.author}
                        content={item.content}
                        create={item.createTime}
                        modifed={item.modifiedDate}
                        deleted={item.deleteDate}
                        subComments={item.subComments}
                        authorId={item.authorId}
                        userId={userId}
                     />
                  ))}
               </div>
            </section>
         ) : (
            ''
         )}

         <section class={styles.section}>
            <form class={styles.form} onSubmit={submitHandler}>
               <FormElement title="Оставьте комментарий">
                  <textarea name="content" class={styles.textarea} required />
               </FormElement>
               <div class={styles.right}>
                  <Button size="small">Отправить</Button>
               </div>
            </form>
         </section>
      </Layout>
   )
}

export default Post
