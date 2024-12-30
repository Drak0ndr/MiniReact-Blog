import { deleteComment } from '../../api/comment/deleteComment'
import { getCommentTree } from '../../api/comment/getCommentTree'
import { postComment } from '../../api/comment/postComment'
import { putComment } from '../../api/comment/putComment'
import { IconEdit } from '../../icons/IconEdit'
import { IconTrash } from '../../icons/IconTrash'
import { Button } from '../../ui/Button/Button'
import { NotificationSystem } from '../../ui/NotificationSystem/NotificationSystem'
import { route } from '../../utils/route'
import styles from './Comment.module.css'

let globalUserId = ''

const clickHandler = async (e) => {
   const rootId = e.target.closest('[data-commentid]').dataset.commentid
   const childCommentsContainer = e.target.nextElementSibling

   const childCommentsRes = await getCommentTree(rootId)
   const childCommentsData = await childCommentsRes.json()

   childCommentsContainer.style.display = 'flex'
   childCommentsContainer.innerHTML = ''

   childCommentsData.forEach((item) => {
      childCommentsContainer.appendChild(
         <Comment
            id={item.id}
            author={item.author}
            content={item.content}
            create={item.createTime}
            modifed={item.modifiedDate}
            deleted={item.deleteDate}
            authorId={item.authorId}
            userId={globalUserId}
         />
      )
   })
}

const editHandler = (e) => {
   const allComments = document.querySelectorAll('[data-commentid]')

   allComments.forEach((item) => {
      const content = item.querySelector(`.${styles.content}`)
      content.removeAttribute('contenteditable')
      content.style.border = 'none'

      const modifedSpan = item.querySelector(`.${styles.edit}`)
      modifedSpan.style.display = ''

      const editBtn = item.querySelector('button')
      if (editBtn) {
         editBtn.style.display = 'none'
      }
   })

   const comment = e.target.closest('[data-commentid]')
   const content = comment.querySelector(`.${styles.content}`)
   const editBtn = comment.querySelector('button')
   const modifedSpan = comment.querySelector(`.${styles.edit}`)

   content.setAttribute('contenteditable', '')
   content.style.border = '1px solid gray'
   editBtn.style.display = 'block'
   modifedSpan.style.display = 'none'
}

const pushEditHandler = async (e) => {
   const comment = e.target.closest('[data-commentid]')
   const content = comment.querySelector(`.${styles.content}`)
   const editBtn = comment.querySelector('button')
   const modifedSpan = comment.querySelector(`.${styles.edit}`)

   content.removeAttribute('contenteditable')
   content.style.border = 'none'
   editBtn.style.display = 'none'

   const res = await putComment(comment.dataset.commentid, { content: content.innerText })

   if (res.status == 200) {
      NotificationSystem.show('Комментарий успешно изменён', 'succes')
      modifedSpan.style.display = 'inline'
      modifedSpan.querySelector(`.${styles.edit_tooltip}`).innerText =
         ` ${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`
   } else {
      NotificationSystem.show('Что-то пошло не так', 'error')
   }
}

const deleteHandler = async (e) => {
   const comment = e.target.closest('[data-commentid]')
   const res = await deleteComment(comment.dataset.commentid)

   if (res.status == 200) {
      NotificationSystem.show('Комментарий успешно удалён', 'succes')
      route('')
   } else {
      NotificationSystem.show('Что-то пошло не так', 'error')
   }
}

const showAnsForm = (e) => {
   const allComments = document.querySelectorAll('[data-commentid]')
   allComments.forEach((item) => {
      const ansForm = item.querySelector('[data-ansform]')
      ansForm.style.display = 'none'
   })

   const comment = e.target.closest('[data-commentid]')
   const ansForm = comment.querySelector('[data-ansform]')
   ansForm.style.display = 'flex'
}

const ansComment = async (e) => {
   const comment = e.target.closest('[data-commentid]')
   const ansForm = comment.querySelector('[data-ansform]')
   const input = ansForm.querySelector('input')
   const res = await postComment(window.location.pathname.split('/')[2], {
      parentId: comment.dataset.commentid,
      content: input.value
   })

   if (res.status == 200) {
      NotificationSystem.show('Комментарий успешно добавлен', 'succes')
      route('')
   } else {
      NotificationSystem.show('Что-то пошло не так', 'error')
   }
}

export const Comment = ({
   id,
   author,
   content,
   create,
   modifed,
   deleted,
   subComments,
   authorId,
   userId
}) => {
   const createDate = create.substring(0, 10).split('-').reverse().join('.')
   const createTime = create.substring(11, 16)
   const modifedDate = modifed ? modifed.substring(0, 10).split('-').reverse().join('.') : ''
   const modifedTime = modifed ? modifed.substring(11, 16) : ''

   globalUserId = userId
   
   return (
      <div class={styles.comment} data-commentid={id}>
         <p class={styles.author}>
            {deleted ? '[Коментарий удалён]' : author}{' '}
            {authorId == userId && !deleted ? (
               <>
                  <IconEdit onClick={editHandler} /> <IconTrash onClick={deleteHandler} />
               </>
            ) : (
               ''
            )}
         </p>
         <div class={styles.edit_container}>
            <p class={styles.content}>
               {deleted ? '[Коментарий удалён]' : content}{' '}
               <span class={styles.edit} data-modifed={modifed && !deleted}>
                  <span class={styles.edit_tooltip}>
                     {modifedDate} {modifedTime}
                  </span>
                  (изменен)
               </span>
            </p>
            {authorId == userId ? (
               <Button variant='gold' size="small" style="display:none" onClick={pushEditHandler}>
                  Редактировать
               </Button>
            ) : (
               ''
            )}
         </div>

         <p>
            {createDate} {createTime}{' '}
            <span class={styles.func} onClick={showAnsForm}>
               Ответить
            </span>
         </p>
         <div class={styles.edit_container} style="display:none" data-ansform>
            <input class={styles.content} placeholder="Оставьте комментарий" />

            <Button size="small" onClick={ansComment}>
               Отправить
            </Button>
         </div>
         {subComments ? (
            <p class={styles.func} onClick={clickHandler}>
               Раскрыть все
            </p>
         ) : (
            ''
         )}
         <div class={styles.other_comments}></div>
      </div>
   )
}
