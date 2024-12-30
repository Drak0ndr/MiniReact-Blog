import { Link } from '../../../miniReact/components/Link/Link'
import { deleteCommunityUnsubscribe } from '../../api/community/deleteCommunityUnsubscribe'
import { postCommunitySubscribe } from '../../api/community/postCommunitySubscribe'
import { Button } from '../../ui/Button/Button'
import { NotificationSystem } from '../../ui/NotificationSystem/NotificationSystem'
import { route } from '../../utils/route'

import styles from './CommunityCard.module.css'

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

export const Community = ({ id, name, role }) => {
   return (
      <div class={styles.container} data-communityId={id}>
         <Link href={`/communities/${id}`}>
            <p style={'font-weight:bold;'}>{name}</p>
         </Link>

         {role == 'Subscriber' ? (
            <Button size="small" variant="red" onClick={unSubscribe}>
               Отписаться
            </Button>
         ) : role == 'Administrator' ? (
            ''
         ) : (
            <Button size="small" onClick={subscribe}>
               Подписаться
            </Button>
         )}
      </div>
   )
}
