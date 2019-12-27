import Vue from 'vue'

const filters = {
  agentType(type) {
    const map = {
      '0': '普通用户',
      '1': '一级代理',
      '2': '二级代理',
      '3': '区域代理',
      '4': '机构'
    }
    return map[type] || type
  },
  commissionType(type) {
    const map = {
      '1': '提现',
      '0': '邀请'
    }
    return map[type] || type
  }
}

export default function() {
  Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
  })
}
