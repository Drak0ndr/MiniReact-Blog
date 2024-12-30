import { postRegister } from '../../api/account/postRegister'
import { Layout } from '../../components/Layout/Layout'
import { Button } from '../../ui/Button/Button'
import { FormElement } from '../../ui/FormElement/FormElement'
import { route } from '../../utils/route'
import { NotificationSystem } from '../../ui/NotificationSystem/NotificationSystem'

import styles from './Register.module.css'

const submitHandler = async (e) => {
   e.preventDefault()
   const formData = new FormData(e.target)
   const res = await postRegister(...formData.values())
   
   if (res.status == '400') {
      const data = await res.json()
      if (data.DuplicateUserName) {
         NotificationSystem.show('Пользователь с таким email уже зарегистрирован', 'error')
      }
      if (data.errors.Password) {
         NotificationSystem.show(
            'Придумайте более сложный пароль \n пароль должен содержать хотя бы 1 цифру',
            'error'
         )
      }
   } else if (res.status != '200') {
      NotificationSystem.show('Что-то пошло не так, возможно сервер опять лежит', 'error')
   } else if (res.status == '200') {
      NotificationSystem.show('Вы успешно зарегистрировались', 'succes')
      const data = await res.json()
      localStorage.setItem('token', data.token)
      route('/')
   }
}

const Register = () => {
   return (
      <Layout>
         <div class={styles.center}>
            <div class={styles.register}>
               <p class={styles.form_name}>Вход</p>
               <form class={styles.form} id="loginFrom" onSubmit={submitHandler}>
                  <FormElement
                     type="text"
                     name={'fullName'}
                     title={'ФИО'}
                     placeholder="Иванов Иван Иванович"
                     required
                  />
                  <FormElement
                     type="date"
                     name={'birthDate'}
                     title={'Дата рождения'}
                     min="1900-01-01"
                     max={`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`}
                  />
                  <FormElement type="select" title={'Пол'} required>
                     <select name={'gender'} required>
                        <option value="Male">Мужчина</option>
                        <option value="Female">Женщина</option>
                     </select>
                  </FormElement>
                  <FormElement
                     type="phone"
                     name={'string'}
                     title={'Телефон'}
                     defaultValue="+7 "
                     mask="(xxx) xxx-xx-xx"
                     placeholder="+7 (xxx) xxx-xx-xx"
                  />
                  <FormElement
                     type="email"
                     name={'email'}
                     title={'Email'}
                     placeholder="name@example.com"
                     required
                  />
                  <FormElement
                     type="password"
                     name={'password'}
                     title={'Пароль'}
                     minlength="6"
                     required
                  />
                  <Button>Зарегистрироваться</Button>
               </form>
            </div>
         </div>
      </Layout>
   )
}

export default Register
