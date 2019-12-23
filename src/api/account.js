import request from '@/utils/request'

export function userList(params) { // 获取管理员列表接口
  return request({
    url: '/admin/account/list',
    method: 'get',
    params
  })
}

export function newUser(params) { // 新增管理员接口
  return request({
    url: '/admin/account',
    method: 'post',
    params
  })
}

export function editRole(params) {
  return request({
    url: '/admin/account/role',
    method: 'post',
    params
  })
}

export function getRoleAll(data) { // 获取角色接口
  return request({
    url: '/admin/role/list?page=0&size=100',
    method: 'get',
    data
  })
}
export function getRole(id) { // 获取角色接口
  return request({
    url: `/admin/account/role/${id}`,
    method: 'get'

  })
}

export function updateUser(params) { // 编辑接口
  return request({
    url: '/admin/account',
    method: 'put',
    params
  })
}
