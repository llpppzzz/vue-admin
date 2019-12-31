export const API_REQUEST_CONTENT_TYPE = 'application/json' // API Content-Type 默认类型
export const TABLE_DEFAULT_PAGE_SIZE = 10
export const UEDITOR_CONFIG = {
  serverUrl: '',
  UEDITOR_HOME_URL: process.env.NODE_ENV === 'production' ? '/test/AttractAdmin/UEditor/' : '/UEditor/',
  aotuHeightEnabled: false,
  autoFloatEnabled: false,
  initialFrameHeight: 320
}
