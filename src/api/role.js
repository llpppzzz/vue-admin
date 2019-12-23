import request from '@/utils/request'

export function getRoleTree(params) {
  return request({
    url: `/admin/role/tree/${params}`,
    method: 'get'

  })
}

export function getRoles(params) {
  return request({
    url: '/admin/role/list',
    method: 'get',
    params
  })
}

export function addRole(params) {
  return request({
    url: '/admin/role',
    method: 'post',
    params
  })
}
export function setRole(params) {
  return request({
    url: '/admin/role/tree',
    method: 'post',
    params
  })
}

export function updateRole(params) {
  return request({
    url: `/admin/role`,
    method: 'put',
    params
  })
}

export function deleteRole(params) {
  return request({
    url: `/admin/role`,
    method: 'delete',
    params
  })
}
