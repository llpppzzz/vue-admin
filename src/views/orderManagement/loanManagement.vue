<template>
	<div class="view-loan-management">
    <div class="searching-box">
      <l-date-picker v-model="dateRange" @change="reloadList"></l-date-picker>
      <l-input-search @confirm="onSearch" />
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
      <el-table-column label="订单号" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作单位" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="身份证号" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="费率" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="放款金额" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="年限期数" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="订单状态">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="订单备注">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="openDetails(scope.row)">订单详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'LoanManagement',
  data() {
    return {
      dateRange: [],
      listLoading: false,
      list: [{}]
    }
  },
  methods: {
    reloadList(val) {
      console.log(this.dateRange)
    },
    onSearch() {},
    openDetails() {
      this.$router.push({ path: '/orderManagement/orderDetail', query: { type: 'loan' }})
    }
  }
}
</script>

<style lang="scss">
.view-loan-management {
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
