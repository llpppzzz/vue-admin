<template>
  <div class="view-financial-management">
    <div class="searching-box">
      <div class="pull-left">
        <l-input-search v-model="searchText" @confirm="onSearch" />
        <l-date-picker v-model="dateRange" @change="onSearch"></l-date-picker>
      </div>
      <el-button size="small" type="primary" plain @click="exportList">一键导出</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="流水编号" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.id">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理身份" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.type">{{ scope.row.type | agentType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.amount">{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="佣金类型" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.reason">{{ scope.row.reason | commissionType }}</span>
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
import Moment from 'moment'
import { getFinancialList, exportFinancialList } from '@/api/financialManagement'

const DEFAULT_DATE = [Moment().subtract(1, 'weeks').format('YYYY-MM-DD'), Moment().format('YYYY-MM-DD')]

export default {
  name: 'FinancialManagement',
  data() {
    return {
      searchText: '',
      dateRange: DEFAULT_DATE,
      listLoading: true,
      list: [],
      api: getFinancialList,
      params: {
        page: 1,
        pageSize: 10,
        beginTime: DEFAULT_DATE[0],
        endTime: DEFAULT_DATE[1]
      }
    }
  },
  methods: {
    formatDate(val) {
      return Moment(val).format('YYYY-MM-DD')
    },
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
        beginTime: this.formatDate(this.dateRange[0]),
        endTime: this.formatDate(this.dateRange[1])
      })
    },
    invitation() {},
    async exportList(row) {
      const params = {
        beginTime: Moment().subtract(1, 'years').format('YYYY-MM-DD'),
        endTime: Moment().format('YYYY-MM-DD')
      }
      location.href = `/web/user/wallets/export?beginTime=${params.beginTime}&endTime=${params.endTime}`
      // try {
      //   const params = {
      //     beginTime: Moment().subtract(1, 'years').format('YYYY-MM-DD'),
      //     endTime: Moment().format('YYYY-MM-DD')
      //   }
      //   const res = await exportFinancialList(params)
      // } catch (e) {
      // }
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
      .l-input-search {
        margin-right: 24px;
      }
    }
  }
</style>
