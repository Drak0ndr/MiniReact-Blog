import { REF } from './REF'

const onLoadElement = new Event('loadElement')

const add = (parent, child) => {
   parent.appendChild(child?.nodeType ? child : document.createTextNode(child))
}

const appendChild = (parent, child) => {
   if (Array.isArray(child)) {
      child.forEach((nestedChild) => appendChild(parent, nestedChild))
   } else {
      add(parent, child ?? '')
   }
}

export const jsx = (tag, props) => {
   const { children } = props
   if (typeof tag === 'function') {
      return tag(props, children)
   }
   let element = document.createElement(tag)
   if (tag == 'svg' || tag == 'path') {
      element = document.createElementNS('http://www.w3.org/2000/svg', tag)
   }
   Object.entries(props || {}).forEach(([name, value]) => {
      if (name.startsWith('on') && name.toLowerCase() in window) {
         element.addEventListener(name.toLowerCase().substr(2), value)
      } else if (name == 'onClickOutside') {
         const clickOutsideFunc = (e) => {
            if (!document.body.contains(element)) {
               document.removeEventListener('click', clickOutsideFunc)
            } else if (!element.contains(e.target)) {
               value(e)
            }
         }
         document.addEventListener('click', clickOutsideFunc)
      } else if (name == 'onLoadElement') {
         element.addEventListener('loadElement', value)
      } else if (name.startsWith('ref')) {
         REF[name] = element
         // console.log('jsx', REF)
      } else if (name != 'children') {
         element.setAttribute(name, value)
      }
   })
   appendChild(element, children)
   element.dispatchEvent(onLoadElement)
   return element
}

export const Fragment = ({ children }) => {
   // console.log(children)
   return children
}

export const jsxs = jsx
