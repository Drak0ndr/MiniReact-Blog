import { getProfile } from '../../api/account/getProfile'
import { putProfile } from '../../api/account/putProfile'
import { Layout } from '../../components/Layout/Layout'
import { Button } from '../../ui/Button/Button'
import { FormElement } from '../../ui/FormElement/FormElement'
import { NotificationSystem } from '../../ui/NotificationSystem/NotificationSystem'
import { route } from '../../utils/route'

import styles from './Profile.module.css'

const submitHandler = async (e) => {
   e.preventDefault()
   const formData = new FormData(e.target)
   const res = await putProfile(...formData.values())

   if (res.status == '400') {
      const error = await res.json()
      try {
         if (error.errors.Email) {
            NotificationSystem.show('Пользователь с таким email уже зарегистрирован', 'error')
         } else {
            NotificationSystem.show('Что-то пошло не так', 'error')
         }
      } catch {
         NotificationSystem.show('Что-то пошло не так', 'error')
      }
   } else if (res.status != '200') {
      NotificationSystem.show('Что-то пошло не так, возможно сервер опять лежит', 'error')
   } else if (res.status == '200') {
      NotificationSystem.show('Данные успешно изменены', 'succes')
   }
}

const selectLoad = (e, value) => {
   e.target.value = value
}

const Profile = async () => {
   let data = {}
   const res = await getProfile()
   
   if (res.status == '401') {
      localStorage.removeItem('token')
      route('/login')
   } else {
      data = await res.json()
      console.log(data)
   }

   return (
      <Layout>
         <div class={styles.profile}>
            <form class={styles.form} id="loginFrom" onSubmit={submitHandler}>
               <FormElement
                  variant="long"
                  type="email"
                  name={'email'}
                  title={'Email'}
                  placeholder="name@example.com"
                  value={data.email}
                  required
               />
               <FormElement
                  variant="long"
                  type="text"
                  name={'fullName'}
                  title={'ФИО'}
                  value={data.fullName}
                  required
               />
               <FormElement
                  variant="long"
                  type="phone"
                  name={'string'}
                  title={'Номер телефона'}
                  defaultValue="+7 "
                  mask="(xxx) xxx-xx-xx"
                  placeholder="+7 (xxx) xxx-xx-xx"
                  value={data.phoneNumber}
               />
               <FormElement variant="long" type="select" title={'Пол'} required>
                  <select
                     name={'gender'}
                     onLoadElement={(e) => {
                        selectLoad(e, data.gender)
                     }}
                     required
                  >
                     <option value="Female">Женщина</option>
                     <option value="Male">Мужчина</option>
                  </select>
               </FormElement>
               <FormElement
                  variant="long"
                  type="date"
                  name={'birthDate'}
                  title={'Дата рождения'}
                  min="1900-01-01"
                  max={`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`}
                  value={data.birthDate ? data.birthDate.split('T')[0] : ''}
               />
               <div class={styles.right}>
                  <Button size="small">Сохранить</Button>
               </div>
            </form>
         </div>
      </Layout>
   )
}

export default Profile
