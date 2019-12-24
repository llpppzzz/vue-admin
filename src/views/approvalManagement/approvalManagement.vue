<template>
  <div class="view-approval-management">
    <div class="searching-box">
      <l-date-picker v-model="dateRange" @change="reloadList"></l-date-picker>
      <el-button size="small" type="primary" plain @click="invitation">邀请用户</el-button>
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
      <el-table-column label="申请人" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="工作单位" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="代理身份" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="getApprove(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ApprovalManagement',
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
    invitation() {},
    getApprove(row) {
      this.$confirm('', '审核状况', {
        distinguishCancelAndClose: true,
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        center: true
      }).then(() => {
        this.$message({
          type: 'info',
          message: '已通过审核'
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel'
            ? '放弃保存并离开页面'
            : '停留在当前页面'
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .view-approval-management {
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
