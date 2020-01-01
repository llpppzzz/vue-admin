import Vue from 'vue'

const filters = {
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
