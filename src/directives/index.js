import Vue from 'vue'
import { addClass, removeClass } from '@/utils'

const directives = {
  // 'null'(el, { value }) {
  //   if ((!value && value !== 0) || (value && value.length === 0)) {
  //     el.innerHTML = '--'
  //   } else {
  //     el.innerHTML = value
  //   }
  // }
  'null'(el, { value }) {
    if ((!value && value !== 0) || (value && value.length === 0)) {
      addClass(el, 'null-handler')
    } else {
      removeClass(el, 'null-handler')
    }
  }
}

export default function() {
  Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key])
  })
}
