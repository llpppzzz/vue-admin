<template>
  <div class="view-financial-management">
    <div class="searching-box">
      <el-button size="small" type="primary" plain @click="exportList">一键导出</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column label="流水编号" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.reasonObj">{{ scope.row.reasonObj }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理身份" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.userType">{{ scope.row.userType | agentType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.amount">{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="佣金类型" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.type">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发生时间" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.createdAt">{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
    </el-table>
    <l-pagination :api="api" :params="params" @list="getListData"></l-pagination>
  </div>
</template>

<script>
import { getFinancialList } from '@/api/financialManagement'

export default {
  name: 'FinancialManagement',
  data() {
    return {
      dateRange: [],
      listLoading: true,
      list: [],
      api: getFinancialList,
      params: {
        page: 1,
        pageSize: 10
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
        beginTime: '',
        endTime: ''
      })
    },
    invitation() {},
    exportList(row) {
    }
  }
}
</script>

<style lang="scss">
  .view-financial-management {
    background: #fff;
    .searching-box {
      padding: 0 0 16px 0;
      display: flex;
      justify-content: space-between;
      .el-input {
        width: 200px;
      }
    }
  }
</style>
