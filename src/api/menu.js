import request from '@/utils/request'

export function getMenuList(query) {
  return request({
    url: '/admin/function',
    method: 'get',
    params: query
  })
}

export function editMenu(query) {
  return request({
    url: '/admin/function',
    method: 'put',
    params: query
  })
}

export function newMenu(query) {
  return request({
    url: '/admin/function',
    method: 'post',
    params: query
  })
}

export function delMenu(params) {
  return request({
    url: '/admin/function',
    method: 'delete',
    params
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
