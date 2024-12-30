import { Link } from '../../../miniReact/components/Link/Link'
import { getProfile } from '../../api/account/getProfile'
import { postLogout } from '../../api/account/postLogout'
import { DropdownMenu } from '../../ui/DropdownMenu/DropdownMenu'
import { NotificationSystem } from '../../ui/NotificationSystem/NotificationSystem'
import { checkUrl } from '../../utils/checkUrl'
import { route } from '../../utils/route'
import styles from './Layout.module.css'

const logoutHandler = async () => {
   const res = await postLogout()

   if (res.status == '200') {
      route('/')
      NotificationSystem.show('Вы успешно вышли', 'succes')
      localStorage.removeItem('token')
   } else {
      NotificationSystem.show('Что-то пошло не так', 'error')
      route('/')
   }
}

export const Layout = async ({ children }) => {
   let data = {}

   if (localStorage.getItem('token')) {
      const res = await getProfile()
      if (res.status == '401') {
         localStorage.removeItem('token')
      } else {
         data = await res.json()
         console.log(data)
      }
   }

   return (
      <>
         <div class={styles.navbar}>
            <nav>
               <div class={styles.nav_item}>
                  <Link class={styles.title} href="/">
                     <span class={styles.title}>Блог №415</span>
                  </Link>
                  <Link href="/">
                     <span class={styles.nav_text}>Главная</span>
                  </Link>
                  {window.location.pathname == '/profile' ? (
                     <Link href="/post/create">
                        <span class={styles.nav_text}>Написать пост</span>
                     </Link>
                  ) : (
                     ''
                  )}

                  {window.location.pathname == '/' ||
                  window.location.pathname == '/communities' ||
                  window.location.pathname == '/authors' ||
                  checkUrl(window.location.pathname, '/communities/:id') ||
                  checkUrl(window.location.pathname, '/post/:id') ? (
                     <Link href="/authors">
                        <span class={styles.nav_text}>Авторы</span>
                     </Link>
                  ) : (
                     ''
                  )}

                  {window.location.pathname == '/' ||
                  window.location.pathname == '/communities' ||
                  checkUrl(window.location.pathname, '/communities/:id') ||
                  checkUrl(window.location.pathname, '/post/:id') ? (
                     <Link href="/communities">
                        <span class={styles.nav_text}>Группы</span>
                     </Link>
                  ) : (
                     ''
                  )}
               </div>
               {localStorage.getItem('token') ? (
                  <DropdownMenu title={data.email}>
                     <Link href="/profile">Профиль</Link>
                     <Link href="/">
                        <span class={styles.nav_menu}>Главная</span>
                     </Link>

                     {window.location.pathname == '/profile' ? (
                        <Link href="/post/create">
                           <span class={styles.nav_menu}>Написать пост</span>
                        </Link>
                     ) : (
                        ''
                     )}

                     {window.location.pathname == '/' ||
                     window.location.pathname == '/communities' ||
                     window.location.pathname == '/authors' ||
                     checkUrl(window.location.pathname, '/communities/:id') ||
                     checkUrl(window.location.pathname, '/post/:id') ? (
                        <Link href="/authors">
                           <span class={styles.nav_menu}>Авторы</span>
                        </Link>
                     ) : (
                        ''
                     )}

                     {window.location.pathname == '/' ||
                     window.location.pathname == '/communities' ||
                     checkUrl(window.location.pathname, '/communities/:id') ||
                     checkUrl(window.location.pathname, '/post/:id') ? (
                        <Link href="/communities">
                           <span class={styles.nav_menu}>Группы</span>
                        </Link>
                     ) : (
                        ''
                     )}

                     <p onClick={logoutHandler}>Выйти</p>
                  </DropdownMenu>
               ) : (
                  <>
                     <Link href="/login">
                        <span class={styles.nav_text}>Вход</span>
                     </Link>
                     <DropdownMenu title={'менюшка'} className={styles.no_auth_menu}>
                        <Link href="/">
                           <span class={styles.nav_menu}>Главная</span>
                        </Link>
                        {window.location.pathname == '/' ||
                        window.location.pathname == '/communities' ||
                        window.location.pathname == '/authors' ||
                        checkUrl(window.location.pathname, '/communities/:id') ||
                        checkUrl(window.location.pathname, '/post/:id') ? (
                           <Link href="/authors">
                              <span class={styles.nav_menu}>Авторы</span>
                           </Link>
                        ) : (
                           ''
                        )}
                        {window.location.pathname == '/' ||
                        window.location.pathname == '/communities' ||
                        checkUrl(window.location.pathname, '/communities/:id') ||
                        checkUrl(window.location.pathname, '/post/:id') ? (
                           <Link href="/communities">
                              <span class={styles.nav_menu}>Группы</span>
                           </Link>
                        ) : (
                           ''
                        )}
                        <Link href="/login">
                           <span class={styles.nav_menu}>Вход</span>
                        </Link>
                     </DropdownMenu>
                  </>
               )}
            </nav>
         </div>
         <main class={styles.main}>{children ? children : ''}</main>
         <footer class={styles.footer} id="footer">
            <p>© 2024 - Блог №415</p>
         </footer>
      </>
   )
}
