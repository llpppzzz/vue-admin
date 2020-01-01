<template>
  <div class="view-approval-management">
    <el-dialog
      title="微信扫描二维码"
      :visible.sync="QRCodeUrlVisible"
      width="300px">
      <canvas id="canvas"></canvas>
    </el-dialog>
    <div class="searching-box">
      <div class="pull-left">
        <l-input-search v-model="searchText" @confirm="onSearch" />
        <l-date-picker v-model="dateRange" @change="onSearch"></l-date-picker>
      </div>
      <!--<el-button size="small" type="primary" plain @click="invitation">邀请区域经理</el-button>-->
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <!--<el-table-column label="选择" align="center" width="80">-->
        <!--<template slot-scope="scope">-->
          <!--<el-radio v-model="radioValue" :label="scope.row.userId" :disabled="scope.row.status !== 1"></el-radio>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="申请人" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.mobile">{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作单位" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.company">{{ scope.row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.idCard">{{ scope.row.idCard }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理身份" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.typeLabel">{{ scope.row.typeLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.statusLabel">{{ scope.row.statusLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="105">
        <template slot-scope="scope">
          <span v-null="scope.row.createTime">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0" size="mini" type="primary" plain @click="getApprove(scope.row)">审核</el-button>
          <span v-else class="null-handler"></span>
        </template>
      </el-table-column>
    </el-table>
    <l-pagination :api="api" :params="params" @list="getListData"></l-pagination>
  </div>
</template>

<script>
import { getApprovalList, doApproval } from '@/api/approvalManagement'
import Moment from 'moment'

const DEFAULT_DATE = [Moment().subtract(1, 'weeks').format('YYYY-MM-DD'), Moment().format('YYYY-MM-DD')]

export default {
  name: 'ApprovalManagement',
  data() {
    return {
      searchText: '',
      dateRange: DEFAULT_DATE,
      listLoading: true,
      list: [],
      api: getApprovalList,
      params: {
        page: 1,
        pageSize: 10,
        beginTime: DEFAULT_DATE[0],
        endTime: DEFAULT_DATE[1]
      },
      // radioValue: '',
      QRCodeUrlVisible: false
    }
  },
  methods: {
    formatDate(val) {
      return Moment(val).format('YYYY-MM-DD')
    },
    getListData(data) {
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
    showMessage(type, message) {
      this.$message({
        type,
        message
      })
    },
    getApprove(row) {
      const params = {
        subId: row.userId
      }
      this.$confirm('', '审核状况', {
        distinguishCancelAndClose: true,
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        center: true
      }).then(async() => {
        try {
          params.status = 1
          const res = await doApproval(params)
          this.showMessage('success', '已通过审核')
          this.onSearch()
        } catch (e) {
          this.showMessage('error', '审核失败')
        }
      }).catch(async(action) => {
        if (action === 'cancel') {
          try {
            params.status = 2
            const res = await doApproval(params)
            this.showMessage('success', '已拒绝通过审核')
            this.onSearch()
          } catch (e) {
            this.showMessage('error', '审核失败')
          }
        }
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
      .l-input-search {
        margin-right: 24px;
      }
    }
    .el-table .el-radio__label {
      display: none;
    }
  }
</style>
