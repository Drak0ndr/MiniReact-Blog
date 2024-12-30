import { Notification } from './Notification'
import styles from './NotifocationRoot.module.css'

export class NotificationSystem {
    static root = undefined
    static notifications = {}
    static n = 0

    static init() {
        const notificatinRoot = document.createElement('div')
        notificatinRoot.classList.add(styles.root)
        document.body.appendChild(notificatinRoot)
        this.root = notificatinRoot
    }

    static show(message, type) {
        const notification = <Notification message={message} type={type}/>
        this.notifications[this.n] = notification
        this.root.appendChild(notification)
        this.hide(this.n)
        this.n +=1
    }

    static hide(n) {
        setTimeout(() => {
            this.notifications[n].remove()
            this.notifications[n] = null
        }, 4000)
    }
}