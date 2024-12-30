import { PhoneInput } from '../PhoneInput/PhoneInput'
import styles from './FormElement.module.css'

export const FormElement = ({ name, title, children, type, variant, ...props }) => {
   return (
      <div
         class={`${styles.form_element} ${styles[variant]} ${type == 'checkbox' ? styles.checkbox : ''}`}
      >
         <label>
            <span>{title}</span>
            {children ? (
               children
            ) : type == 'phone' ? (
               <PhoneInput class={styles.input} name={name} {...props} />
            ) : (
               <input class={styles.input} type={type} name={name} {...props} />
            )}
         </label>

         <span class={styles.error} data-error="false"></span>
      </div>
   )
}
