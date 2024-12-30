import { routeLink } from '../../../src/utils/route'
import styles from './Link.module.css'
export const Link = ({ href, children }) => (
   <a class={styles.a} href={href} data-link onClick={routeLink}>
      {children ? children : ''}
   </a>
)
