import Vue from 'vue'

const filters = {
  agentType(type) {
    const map = {
      '0': '普通用户',
      '1': '高级合伙人',
      '2': '合伙人',
      '3': '区域经理',
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
