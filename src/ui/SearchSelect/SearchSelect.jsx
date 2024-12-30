import { IconDownChevron } from '../../icons/IconDownChevron'
import { IconSearch } from '../../icons/IconSearch'
import styles from './SearchSelect.module.css'

const selectBtnHandler = (e) => {
   const selectBtn = e.target.closest(`.${styles.wrapper}`).querySelector(`.${styles.select_btn}`)

   document.querySelectorAll(`.${styles.select_btn}`).forEach((item) => {
      if (item != selectBtn) {
         item.parentNode.classList.remove(styles.active)
      }
   })

   selectBtn.parentNode.classList.toggle(styles.active)
}

const clickOutsideHandler = (e) => {
   //   console.log(e.target)
   //   e.target.parentNode.querySelectorAll(`.${styles.select_btn}`).forEach((item) => {
   //     item.parentNode.classList.remove(styles.active)
   //   })
}

const selectItem = (e) => {
   const selectBtn = e.target.closest(`.${styles.wrapper}`).querySelector(`.${styles.select_btn}`)

   selectBtn.parentNode.classList.remove(styles.active)
   selectBtn.firstElementChild.innerText = e.target.innerText
   selectBtn.dataset.value = e.target.dataset.value
   selectBtn.parentNode.querySelector('select').value = e.target.dataset.value
}

export const setSearchSelectOptions = (container, onChange, data) => {
   const shadowSelect = container.querySelector(`.${styles.shadow_select}`)
   shadowSelect.innerHTML = ''
   shadowSelect.appendChild(<option value="no">Не выбран</option>)

   data.forEach((item) => {
      shadowSelect.appendChild(<option value={item.value}>{item.name}</option>)
   })
   
   const options = container.querySelector(`.${styles.options}`)
   options.innerHTML = ''
   options.appendChild(
      <li
         data-value="no"
         onClick={(e) => {
            selectItem(e)
            onChange(e)
         }}
      >
         Не выбран
      </li>
   )

   data.forEach((item) => {
      options.appendChild(
         <li
            data-value={item.value}
            onClick={(e) => {
               selectItem(e)
               onChange(e)
            }}
         >
            {item.name}
         </li>
      )
   })
}

export const SearchSelect = ({ options, name, onChange, searchFunc, parentId, ...props }) => {
   return (
      <div class={styles.wrapper} onClickOutside={clickOutsideHandler} data-parentid={parentId}>
         <select class={styles.shadow_select} name={name}>
            <option value="no">Не выбран</option>
            {options.map((item) => (
               <option value={item.value}>{item.name}</option>
            ))}
         </select>
         <div class={styles.select_btn} data-value="no" onClick={selectBtnHandler} {...props}>
            <span>Не выбран</span>
            <IconDownChevron />
         </div>
         <div class={styles.content}>
            <div class={styles.search}>
               <input type="text" placeholder="Search" onInput={searchFunc}></input>
            </div>
            <ul class={styles.options}>
               <li
                  data-value="no"
                  onClick={(e) => {
                     selectItem(e)
                     onChange(e)
                  }}
               >
                  Не выбран
               </li>
               {options.map((item) => (
                  <li
                     data-value={item.value}
                     onClick={(e) => {
                        selectItem(e)
                        onChange(e)
                     }}
                  >
                     {item.name}
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}
