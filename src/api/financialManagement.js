import request from '@/utils/request'
// import { formatUrl } from '@/utils'

// 流水列表
export function getFinancialList(data) {
  return request({
    url: '/web/user/wallets',
    method: 'get',
    params: data
  })
}

// 导出
export function exportFinancialList(data) {
  return request({
    url: '/web/user/wallets/export',
    method: 'get',
    params: data
  })
}
