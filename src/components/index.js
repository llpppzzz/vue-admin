import Vue from 'vue'
import InputSearch from './InputSearch'
import DatePicker from './DatePicker'
import Pagination from './Pagination'
// 富文本
import VueUeditorWrap from 'vue-ueditor-wrap'

export default () => {
  Vue.component('l-input-search', InputSearch)
  Vue.component('l-date-picker', DatePicker)
  Vue.component('l-pagination', Pagination)
  Vue.component('vue-ueditor-wrap', VueUeditorWrap)
}
