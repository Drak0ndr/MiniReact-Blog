import styles from './DropdownMenu.module.css'

const clickHandler = (e) => {
   const dropdown = e.target.parentNode.parentNode
   if (dropdown.querySelector('div[data-drop-content]')) {
      dropdown.querySelector('div[data-drop-content]').classList.toggle(styles.show)
   }
   if (dropdown.querySelector('img')) {
      dropdown.querySelector('img').classList.toggle(styles.rotate)
   }
}

const outsideClickHandler = (e) => {
   const dropContent = document.querySelector('div[data-drop-content]')
   if (dropContent) {
      dropContent.classList.remove(styles.show)
      dropContent.parentNode.querySelector('img').classList.remove(styles.rotate)
   }
}

export const DropdownMenu = ({ title, children, className }) => {
   return (
      <div
         class={`${styles.dropdown} ${className}`}
         onClick={clickHandler}
         onClickOutside={outsideClickHandler}
      >
         <div class={styles.title}>
            <p>{title}</p>
            <img src="/img/arrow.png" width="10px" class={styles.img} />
         </div>
         <div class={styles.drop_content} data-drop-content>
            {children}
         </div>
      </div>
   )
}
