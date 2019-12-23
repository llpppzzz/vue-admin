import request from '@/utils/request'

export function getRouter(params) { // 获取管理员列表接口
  return request({
    url: '/admin/userMenus',
    method: 'get',
    params
  })
}
