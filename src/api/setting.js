import request from '@/utils/request'
export function updatePassword(params) { // 列表
  return request({
    url: '/admin/account/settings/password',
    method: 'put',
    params
  })
}
