import Vue from 'vue'

const filters = {
  agentType(type) {
    const map = {
      'CUSTOMER': '普通用户',
      'AGENCY_1': '一级代理',
      'AGENCY_2': '二级代理',
      'AREA_AGENCY': '区域代理',
      'INSTITUTION': '机构'
    }
    console.log(map[type])
    return map[type] || type
  }
}

export default function() {
  Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
  })
}
