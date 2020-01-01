<template>
  <div class="view-approval-management">
    <el-dialog
      title="提示"
      :visible.sync="QRCodeUrlVisible"
      width="30%">
      <img :src="QRCodeUrl" alt="QRCodeUrl">
    </el-dialog>
    <div class="searching-box">
      <l-date-picker v-model="dateRange" @change="onSearch"></l-date-picker>
      <el-button size="small" type="primary" plain @click="invitation">邀请用户</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="选择" align="center" width="80">
        <template slot-scope="scope">
          <el-radio v-model="radioValue" :label="scope.row.userId" :disabled="scope.row.status !== 1"></el-radio>
        </template>
      </el-table-column>
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
      <el-table-column label="创建时间" align="center">
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
import { getApprovalList, doApproval, getQRCode } from '@/api/approvalManagement'
import Moment from 'moment'

const DEFAULT_DATE = [Moment().subtract(1, 'weeks').format('YYYY-MM-DD'), Moment().format('YYYY-MM-DD')]

export default {
  name: 'ApprovalManagement',
  data() {
    return {
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
      radioValue: '',
      QRCodeUrl: '',
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
        beginTime: this.formatDate(this.dateRange[0]),
        endTime: this.formatDate(this.dateRange[1])
      })
    },
    async invitation() {
      try {
        const row = this.list.filter(one => this.radioValue === one.userId)[0] || {}
        const params = {
          type: row.type || '',
          userId: this.radioValue || 0
        }
        console.log(params)
        const res = await getQRCode(params)
        this.QRCodeUrl = res.data.url
        this.QRCodeUrlVisible = true
      } catch (e) {
        console.log(e)
      }
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
      .el-input {
        width: 200px;
      }
    }
    .el-table .el-radio__label {
      display: none;
    }
  }
</style>
