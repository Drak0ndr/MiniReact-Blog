import { Link } from '../../../miniReact/components/Link/Link'
import { postLogin } from '../../api/account/postLogin'
import { Layout } from '../../components/Layout/Layout'
import { Button } from '../../ui/Button/Button'
import { FormElement } from '../../ui/FormElement/FormElement'
import { NotificationSystem } from '../../ui/NotificationSystem/NotificationSystem'
import { route } from '../../utils/route'

import styles from './Login.module.css'

const submitHandler = async (e) => {
   e.preventDefault()
   const formData = new FormData(e.target)
   const res = await postLogin(...formData.values())

   if (res.status == '400') {
      NotificationSystem.show('Вы ввели неверный логин или пароль', 'error')
   } else if (res.status != '200') {
      NotificationSystem.show('Что-то пошло не так, возможно сервер опять лежит', 'error')
   } else if (res.status == '200') {
      NotificationSystem.show('Вы успешно авторизовались', 'succes')
      const data = await res.json()
      localStorage.setItem('token', data.token)
      console.log(data.token)
      route('/')
   }
}

const Login = () => {
   return (
      <Layout>
         <div class={styles.center}>
            <div class={styles.login}>
               <p class={styles.form_name}>Вход</p>
               <form class={styles.form} id="loginFrom" onSubmit={submitHandler}>
                  <FormElement
                     type="email"
                     name={'email'}
                     title={'Email'}
                     placeholder="name@example.com"
                     required
                  />
                  <FormElement type="password" name={'password'} title={'Пароль'} required />
                  <Button>Войти</Button>
               </form>
               <Link href="/registration">
                  <Button variant="grey">Зарегистрироваться</Button>
               </Link>
            </div>
         </div>
      </Layout>
   )
}

export default Login
