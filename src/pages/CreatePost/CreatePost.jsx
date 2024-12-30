import { getAddressSearch } from '../../api/address/getAddressSearch'
import { getCommunityId } from '../../api/community/getCommunityId'
import { getCommunityMy } from '../../api/community/getCommunityMy'
import { postCommunityIdPost } from '../../api/community/postCommunityIdPost'
import { postPost } from '../../api/post/postPost'
import { getTag } from '../../api/tag/getTag'
import { Layout } from '../../components/Layout/Layout'
import { Button } from '../../ui/Button/Button'
import { FormElement } from '../../ui/FormElement/FormElement'
import { NotificationSystem } from '../../ui/NotificationSystem/NotificationSystem'
import { SearchSelect, setSearchSelectOptions } from '../../ui/SearchSelect/SearchSelect'
import { getQueryParams } from '../../utils/queryParams'
import { route } from '../../utils/route'

import styles from './CreatePost.module.css'

const onChangeHandler = async (e) => {
   const element = e.target.closest('div').previousSibling
   const currentIndex = +element.dataset.addressindex
   const container = element.closest('#addressSelects')
   const allAddressSelect = container.querySelectorAll('[data-addressindex]')
   const elementData = element.dataset.value == 'no' ? '' : JSON.parse(element.dataset.value)

   const addressRes = await getAddressSearch(elementData.objectId)
   const addresData = await addressRes.json()

   let objectLevelData = new Set()

   allAddressSelect.forEach((item) => {
      if (+item.dataset.addressindex > currentIndex) {
         item.parentNode.parentNode.parentNode.remove()
      }
      const selectTitle = item.parentNode.parentNode.parentNode.querySelector('label span')
      selectTitle.innerText =
         item.dataset.value == 'no'
            ? 'Следующий элемент адреса'
            : JSON.parse(item.dataset.value).objectLevelText
   })

   if (addresData.length > 0) {
      addresData.forEach((item) => {
         objectLevelData.add(item.objectLevelText)
      })

      container.appendChild(
         <FormElement title={'Следующий элемент адреса'}>
            <SearchSelect
               options={addresData.map((item) => ({
                  value: JSON.stringify(item),
                  name: item.text
               }))}
               name="addressId"
               data-addressindex={currentIndex + 1}
               data-oldid={elementData.objectId}
               onChange={onChangeHandler}
               searchFunc={inputSearchFunc}
               parentId={elementData.objectId}
            />
         </FormElement>
      )
   }
}

const subminHandler = async (e) => {
   e.preventDefault()
   const formData = new FormData(e.target)
   const data = {}

   for (const [key, value] of formData.entries()) {
      if (data[key]) {
         if (Array.isArray(data[key])) {
            data[key].push(value)
         } else {
            data[key] = [data[key]]
            data[key].push(value)
         }
      } else {
         data[key] = value
      }
   }
   if (Array.isArray(data.addressId)) {
      if (data.addressId[data.addressId.length - 1] == 'no' && data.addressId.length > 1) {
         data.addressId = JSON.parse(data.addressId[data.addressId.length - 2]).objectGuid
      } else if (data.addressId.length == 1 && data.addressId[0] == 'no') {
         data.addressId = ''
      } else {
         data.addressId = JSON.parse(data.addressId[data.addressId.length - 1]).objectGuid
      }
   } else if (data.addressId == 'no') {
      data.addressId = ''
   }
   if (!Array.isArray(data.tags)) {
      data.tags = [data.tags]
   }
   if (!data.addressId) {
      data.addressId = null
   }
   if (!data.image) {
      data.image = null
   }
   console.log(data)
   if (data.group == 'no') {
      const res = await postPost(data)
      if (res.status == 200) {
         NotificationSystem.show('Пост успешно создан', 'succes')
         const postData = await res.json()
         console.log(postData)
         route('/')
      } else {
         NotificationSystem.show('Что-то пошло не так', 'error')
      }
   } else {
      const res = await postCommunityIdPost(data.group, data)
      if (res.status == 200) {
         NotificationSystem.show('Пост успешно создан', 'succes')
         const postData = await res.json()
         console.log(postData)
         route('/')
      } else {
         NotificationSystem.show('Что-то пошло не так', 'error')
      }
   }

   // console.log(postData)
}

const inputSearchFunc = async (e) => {
   const selectBtn = e.target.parentNode.parentNode.previousSibling
   const container = selectBtn.parentNode
   const parentId = container.dataset.parentid
   console.log(parentId)
   const addressRes = await getAddressSearch(parentId, e.target.value)
   const addresData = await addressRes.json()
   setSearchSelectOptions(
      container,
      onChangeHandler,
      addresData.map((item) => ({
         value: JSON.stringify(item),
         name: item.text
      }))
   )
}

const selectLoad = (e) => {
   e.target.value = getQueryParams()['group'] || 'no'
}

const CreatePost = async () => {
   const searchTagRes = await getTag()
   const searchTags = await searchTagRes.json()
   let myCommunityData = []

   if (localStorage.getItem('token')) {
      const myRes = await getCommunityMy()
      myCommunityData = await myRes.json()
      for (let i = 0; i < myCommunityData.length; i++) {
         const groupRes = await getCommunityId(myCommunityData[i].communityId)
         const groupData = await groupRes.json()
         myCommunityData[i].name = groupData.name
      }
   }

   const basicAddressRes = await getAddressSearch('')
   const basicAddressData = await basicAddressRes.json()

   return (
      <Layout>
         <section class={styles.section}>
            <h1>Написать новый пост</h1>
            <form onSubmit={subminHandler}>
               <div class={styles.section1}>
                  <FormElement name="title" title="Название" minLength={5} required />
                  <FormElement name="readingTime" title="Время чтения" type="number" required />
               </div>
               <div class={styles.section2}>
                  <FormElement title="Группа">
                     <select name="group" onLoadElement={selectLoad}>
                        <option value="no">Без группы</option>
                        {myCommunityData.map((item) =>
                           item.role == 'Administrator' ? (
                              <option value={item.communityId}>{item.name}</option>
                           ) : (
                              ''
                           )
                        )}
                     </select>
                  </FormElement>
                  <FormElement title="Тэги">
                     <select name="tags" multiple required>
                        {searchTags.map((item) => (
                           <option value={item.id}>{item.name}</option>
                        ))}
                     </select>
                  </FormElement>
               </div>
               <FormElement name="image" title="Ссылка на картинку" />
               <FormElement title="Текст">
                  <textarea class={styles.textarea} name="description" required minLength={5}></textarea>
               </FormElement>
               <h2>Адрес</h2>
               <div id="addressSelects">
                  <FormElement title="Субъект РФ">
                     <SearchSelect
                        options={basicAddressData.map((item) => ({
                           value: JSON.stringify(item),
                           name: item.text
                        }))}
                        name="addressId"
                        data-addressindex="1"
                        onChange={onChangeHandler}
                        searchFunc={inputSearchFunc}
                        parentId={''}
                     />
                  </FormElement>
               </div>

               <div class={styles.right}>
                  <Button size="small">Создать пост</Button>
               </div>
            </form>
         </section>
      </Layout>
   )
}

export default CreatePost
