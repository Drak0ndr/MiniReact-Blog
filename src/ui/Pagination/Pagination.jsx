import { IconLeftChevron } from '../../icons/IconLeftChevron'
import { IconRightChevron } from '../../icons/IconRightChevron'
import { addQueryParams, getQueryParams } from '../../utils/queryParams'
import { route } from '../../utils/route'
import { Button } from '../Button/Button'

import styles from './Pagination.module.css'

const pageHandler = (e) => {
   addQueryParams('page', e.target.closest('button').dataset.page)
}

export const Pagination = ({ total }) => {
   let active = getQueryParams()['page'] ?? 1
   active = +active
   let isDot = true
   return (
      <div class={styles.container}>
         <Button
            variant="blue_outline"
            size="small"
            data-page={active > 1 ? active - 1 : active}
            onClick={pageHandler}
         >
            <IconLeftChevron />
         </Button>
         {Array(total)
            .fill(0)
            .map((item, ind) => {
               if (ind + 1 - active == 0) {
                  isDot = true
               }
               if (
                  Math.abs(ind + 1 - active) <= 1 ||
                  (ind < 5 && active < 5) ||
                  (total - ind - 1 < 5 && total - active < 4) ||
                  ind == 0 ||
                  ind == total - 1
               ) {
                  return (
                     <Button
                        size="small"
                        variant={ind + 1 == active ? 'blue' : 'blue_outline'}
                        data-page={ind + 1}
                        onClick={pageHandler}
                     >
                        {ind + 1}
                     </Button>
                  )
               } else if (isDot) {
                  isDot = false
                  return <span class={styles.dots}> . . . </span>
               }
            })}
         <Button
            variant="blue_outline"
            size="small"
            data-page={active < total ? active + 1 : active}
            onClick={pageHandler}
         >
            <IconRightChevron />
         </Button>
      </div>
   )
}
