import { Link } from '../../../miniReact/components/Link/Link'
import { deleteLike } from '../../api/post/deleteLike'
import { postLike } from '../../api/post/postLike'
import { IconComment } from '../../icons/IconComment'
import { IconLike } from '../../icons/IconLike'
import { IconLocation } from '../../icons/IconLocation'
import { NotificationSystem } from '../../ui/NotificationSystem/NotificationSystem'
import { route } from '../../utils/route'
import styles from './Article.module.css'

const onErrorImage = (e) => {
   e.target.src =
      'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
}

const fullReadHandler = (e, description) => {
   const parent = e.target.closest('div')
   parent.innerHTML = ''
   description.split('\n').forEach((item) => parent.appendChild(<p>{item}</p>))
}

const toggleLike = async (e) => {
   const likeIcon = e.target.closest('svg')
   const likeSpan = likeIcon.parentNode.querySelector('span')
   const hasLiked = likeIcon.getAttribute('fill') == 'red'
   const postId = e.target.closest('[data-postid]').dataset.postid

   let res = ''

   if (hasLiked) {
      res = await deleteLike(postId)
   } else {
      res = await postLike(postId)
   }

   if (res.status == 401) {
      NotificationSystem.show('вы не авторизованы', 'error')
   } else if (res.status != 200) {
      NotificationSystem.show('что-то пошло не так', 'error')
   } else {
      likeIcon.setAttribute('fill', hasLiked ? 'none' : 'red')
      
      if (hasLiked) {
         likeSpan.innerText = +likeSpan.innerText - 1
      } else {
         likeSpan.innerText = +likeSpan.innerText + 1
      }
   }
}

const scrollToComment = (e) => {
   const article = e.target.closest('[data-postId]')
   route(`/post/${article.dataset.postid}`, () => {
      setTimeout(() => {
         window.scrollTo({
            top: document.body.scrollHeight * 2,
            behavior: 'smooth'
         })
      }, 100)
   })
}

export const Article = ({
   id,
   author,
   create,
   communityName,
   title,
   img,
   description,
   tags,
   readingTime,
   comments,
   likes,
   hasLiked,
   fullRead = false,
   address = ''
}) => {
   const createDate = create.substring(0, 10).split('-').reverse().join('.')
   const createTime = create.substring(11, 16)

   let shortDescription = description.substring(0, 500) + '...'
   if (description.length - shortDescription.length < 100 || fullRead) {
      shortDescription = description
   }
   return (
      <article class={styles.article} data-postId={id}>
         <div class={styles.head}>
            <p class={styles.author}>
               <span>
                  {author} - {createDate} {createTime}
               </span>
               <span>{communityName ? ` в сообществе "${communityName}"` : ''}</span>
            </p>
            <Link href={`/post/${id}`}>
               <p
                  class={styles.title}
                  onClick={() => {
                     window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                     })
                  }}
               >
                  {title}
               </p>
            </Link>

            <hr> </hr>
         </div>
         {img && (
            <img
               class={styles.img}
               src={img}
               alt="тут должна была быть картинка"
               loading="lazy"
               onError={onErrorImage}
            />
         )}
         <div class={styles.content}>
            <div class={styles.text}>
               {shortDescription.split('\n').map((item) => (
                  <p>{item}</p>
               ))}
               {shortDescription != description ? (
                  <span class={styles.full_read} onClick={(e) => fullReadHandler(e, description)}>
                     Читать полностью
                  </span>
               ) : (
                  ''
               )}
            </div>

            <p class={styles.tags}>
               {tags.map((item) => (
                  <span>#{item.name}</span>
               ))}
            </p>
            <p>Время чтения: {readingTime} мин.</p>
            {address ? (
               <p class={styles.location}>
                  <IconLocation />
                  {address}
               </p>
            ) : (
               ''
            )}
         </div>
         <div class={styles.stats}>
            <div class={styles.stat_item} onClick={scrollToComment}>
               <span>{comments}</span>
               <IconComment />
            </div>
            <div class={styles.stat_item}>
               <span>{likes}</span>
               <IconLike hasLiked={hasLiked} onClick={toggleLike} />
            </div>
         </div>
      </article>
   )
}
