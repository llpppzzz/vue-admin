<template>
  <div class="l-pagination">
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
/**
   * TODO: 重构本组件，由于已有历史代码、历史接口限制，本组件现有封装已不适合灵活扩展，需要推翻重构
   * 分页组件封装。
   * 内部处理分页参数，降低页面多个分页式的复杂度。
   * @param url           [请求地址]
   * @param params        [请求参数]
   * @param loading       [是否loading，默认true]
   * @param card          [是否卡片列表，默认false]
   * @param top           [顶部距离]
   * @param auto-fetch    [立即查询，默认true]
   * @param small         [精简模式，默认false]
   * @example
   *   gf-pagination(:api='apiMethod', :params="params", @list="queryList" top="20")
   * @return
   *   queryList (data) {
   *     this.list = data.list
   *     this.pageStatus = data.status
   *   }
   * @return list         [列表数据]
   * @return status   [列表状态]
   */
import { TABLE_DEFAULT_PAGE_SIZE } from '@/utils/constants'

export default {
  name: 'LPagination',
  props: {
    api: {
      type: Function,
      required: true
    },
    params: {
      type: Object,
      default: function() {
        return {}
      }
    },
    autoFetch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      isHandle: true
    }
  },
  computed: {
    pageSize() {
      return this.params.pageSize || TABLE_DEFAULT_PAGE_SIZE
    }
  },
  watch: {
    params: {
      handler(params) {
        if (this.currentPage === 1) {
          this.queryTableList()
        } else {
          this.currentPage = 1
        }
      },
      deep: true
    }
  },
  created() {
    if (this.autoFetch) {
      this.queryTableList()
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('beforeChange')
      this.currentPage = val
      this.queryTableList(true)
    },
    async queryTableList(bool) {
      const params = Object.assign({}, this.params, {
        page: this.currentPage,
        pageSize: this.pageSize
      })
      try {
        if (typeof this.api === 'function') {
          const result = await this.api(params)
          const length = result.data.aaData && result.data.aaData.length
          if (!result || !length) {
            this.total = 0
            this.setListData([])
            return false
          }
          this.total = result.data.iTotalRecordsLong
          this.setListData(result.data.aaData)
        }
      } catch (err) {
        this.setListData([])
      }
    },
    setListData(list) {
      const data = {
        list,
        pageParams: {
          page: this.currentPage,
          pageSize: this.pageSize,
          total: this.total
        }
      }
      this.$emit('list', data)
    }
  }
}
</script>

<style lang="scss">
  .l-pagination {
    width: 100%;
    padding: 30px 0;
    .el-pagination {
      text-align: center;
    }
  }
</style>
