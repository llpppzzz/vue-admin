import request from '@/utils/request'
// import { formatUrl } from '@/utils'

export function getAgents(data) {
  return request({
    url: '/api/user/agenies',
    method: 'get',
    params: data
  })
}
