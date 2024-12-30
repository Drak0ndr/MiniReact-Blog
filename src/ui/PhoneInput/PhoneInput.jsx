const doMask = (defaultValue, mask, phone) => {
   if (phone) {
      const digits = phone.replace('+7', '').replace('+8', '').replace(/\D/g, '')
      let res = ''

      if (digits.length) {
         res = mask

         for (let i = 0; i < digits.length; i++) {
            res = res.replace('x', digits[i])
         }
         let lastDigitInd = 0
         
         for (let i = 0; i < res.length; i++) {
            if (Number.isInteger(+res[i]) && res[i] != ' ') {
               lastDigitInd = i
            }
         }
         res = res.slice(0, lastDigitInd + 1)
      }
      return defaultValue + res
   } else {
      return ''
   }
}

const inputHandler = (e) => {
   const mask = e.target.dataset.mask
   const defaultValue = e.target.dataset.defaultvalue
   const res = doMask(defaultValue, mask, e.target.value)
   if (res.length == mask.length) {
      e.target.setCustomValidity('')
   }
   e.target.value = res
}

const focusHandler = (e) => {
   if (e.target.value.length > 0) {
      e.target.setCustomValidity('Заполните это поле')
   }
   if (e.target.value.length == 0) {
      e.target.value = e.target.dataset.defaultvalue
   }
}

const blurHandler = (e, defaultValue, mask) => {
   if (e.target.value == defaultValue) {
      e.target.value = ''
   }
   if (e.target.value.length > 0 && e.target.value.length < mask.length + defaultValue.length) {
      e.target.setCustomValidity('Заполните это поле')
   } else {
      e.target.setCustomValidity('')
   }
}

export const PhoneInput = ({ mask, defaultValue, value, ...props }) => {
   return (
      <input
         {...props}
         data-defaultValue={defaultValue}
         data-mask={mask}
         minlength={mask.length + defaultValue.length}
         value={doMask(defaultValue, mask, value)}
         onInput={inputHandler}
         onFocus={focusHandler}
         onBlur={(e) => blurHandler(e, defaultValue, mask)}
      />
   )
}
