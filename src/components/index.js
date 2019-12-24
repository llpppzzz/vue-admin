import Vue from 'vue'
import InputSearch from './InputSearch'
import DatePicker from './DatePicker'
// 富文本
import VueUeditorWrap from 'vue-ueditor-wrap'

export default () => {
  Vue.component('l-input-search', InputSearch)
  Vue.component('l-date-picker', DatePicker)
  Vue.component('vue-ueditor-wrap', VueUeditorWrap)
}
