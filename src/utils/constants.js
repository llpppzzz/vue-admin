export const API_REQUEST_CONTENT_TYPE = 'application/json' // API Content-Type 默认类型
export const TABLE_DEFAULT_PAGE_SIZE = 10
export const UEDITOR_CONFIG = {
  serverUrl: '',
  UEDITOR_HOME_URL: process.env.NODE_ENV === 'production' ? '/test/AttractAdmin/UEditor/' : '/UEditor/',
  aotuHeightEnabled: false,
  autoFloatEnabled: false,
  initialFrameHeight: 320
}
export const AGENT_INVITATION = {
  1: [{
    value: 0,
    label: '普通用户'
  }, {
    value: 2,
    label: '高级合伙人'
  }, {
    value: 3,
    label: '合伙人'
  }, {
    value: 4,
    label: '机构'
  }],
  2: [{
    value: 0,
    label: '普通用户'
  }, {
    value: 3,
    label: '合伙人'
  }],
  3: [{
    value: 0,
    label: '普通用户'
  }],
  4: [{
    value: 0,
    label: '普通用户'
  }]
}
