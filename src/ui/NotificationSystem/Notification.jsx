import styles from './Notification.module.css'

export const Notification = ({ message, type }) => {
   return (
      <div class={`${styles.notification} ${styles[type]}`}>
         <p class={styles.message}>{message}</p>
      </div>
   )
}
