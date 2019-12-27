import request from '@/utils/request'
// import { formatUrl } from '@/utils'

// 审批列表
export function getApprovalList(data) {
  return request({
    url: '/web/invitations',
    method: 'get',
    params: data
  })
}

// 审批
export function doApproval(data) {
  return request({
    url: '/web/invitation/examination',
    method: 'post',
    data
  })
}

// 邀请二维码
export function getQRCode(data) {
  return request({
    url: '/web/invitation/qrcode',
    method: 'post',
    data
  })
}
