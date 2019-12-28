<template>
  <el-dialog
    title="选择绑定代理人"
    :visible.sync="isShow"
    width="50%"
    center>
    <div class="agent-leave-dialog">
      <l-input-search v-model="searchText" @confirm="onSearch" />
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        stripe
      >
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-radio v-model="radioValue" :label="scope.row.id"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.name">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理身份" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.name">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上级名称" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.name">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.createdAt">{{ scope.row.createdAt }}</span>
          </template>
        </el-table-column>
      </el-table>
      <l-pagination :api="api" :params="params" @list="getListData"></l-pagination>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button plain @click="isShow = false">取 消</el-button>
    <el-button type="primary" plain @click="isShow = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import { getAgents } from '@/api/userManagement'

export default {
  name: 'BindAgentDialog',
  props: {
    type: {
      type: String,
      default: 'customer'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      listLoading: false,
      radioValue: '',
      searchText: '',
      list: [],
      api: getAgents,
      params: {
        page: 1,
        pageSize: 5
      }
    }
  },
  watch: {
    isShow(val, oldVal) {
      if (val !== oldVal) {
        this.$emit('update:visible', val)
      }
    },
    visible(val, oldVal) {
      if (val !== oldVal) {
        this.isShow = val
      }
    }
  },
  methods: {
    getListData(data) {
      console.log(data)
      if (!data.list.length) {
        this.list = []
        this.listLoading = false
        return false
      }
      this.list = data.list
      this.listLoading = false
    },
    onSearch() {
      this.listLoading = true
      this.params = Object.assign({}, this.params, {
        name: this.searchText,
        type: this.activeName
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.agent-leave-dialog {
  .l-input-search {
    width: 100%;
    margin-bottom: 24px;
  }
}
</style>
