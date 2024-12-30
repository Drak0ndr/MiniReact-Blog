import styles from './Button.module.css'

export const Button = ({ variant = 'blue', size, children, adaptive = true, ...props }) => {
   return (
      <button
         class={`${styles.button} ${styles[variant]} ${styles[size]} ${adaptive ? styles.adaptive : ''}`}
         {...props}
      >
         {children}
      </button>
   )
}
