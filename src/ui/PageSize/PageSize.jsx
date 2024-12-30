import { addQueryParams, getQueryParams } from '../../utils/queryParams'
import { route } from '../../utils/route'
import styles from './PageSize.module.css'
const changeHandler = (e) => {
   addQueryParams('size', e.target.value)
   addQueryParams('page', 1)
}

const loadHandler = (e) => {
   const active = getQueryParams()['size'] ?? 5
   e.target.value = active.toString()
}

export const PageSize = ({ options, title }) => {
   return (
      <label class={styles.label}>
         <span>{title}</span>
         <select class={styles.select} onChange={changeHandler} onLoadElement={loadHandler}>
            {options.map((item) => (
               <option value={item}>{item}</option>
            ))}
         </select>
      </label>
   )
}
