import request from '@/utils/request'
// import { formatUrl } from '@/utils'

// 用户列表
export function getUsers(data) {
  return request({
    url: '/web/users',
    method: 'get',
    params: data
  })
}

// 更改用户上级
export function changeUserInviter(data) {
  return request({
    url: '/web/user/inviter',
    method: 'post',
    data
  })
}

// 用户详情
export function getUsersInformation(data) {
  return request({
    url: '/web/user/information',
    method: 'get',
    params: data
  })
}

// 代理列表
export function getAgents(data) {
  return request({
    url: '/web/agencies',
    method: 'get',
    params: data
  })
}

// 代理详情
export function getAgentInformation(data) {
  return request({
    url: '/web/agency/information',
    method: 'get',
    params: data
  })
}

// 代理晋升
export function agentPromotion(data) {
  return request({
    url: '/web/agency/promotion',
    method: 'post',
    data
  })
}

// 代理离职
export function agentQuit(data) {
  return request({
    url: '/web/agency/quit',
    method: 'post',
    data
  })
}
