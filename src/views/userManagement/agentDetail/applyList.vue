<template>
  <div class="tab-apply-list">
    <detail-block title="申卡订单">
      <el-table
        :data="creditCardOrderList"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="订单id" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.orderId">{{ scope.row.orderId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.productName">{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.statusLabel">{{ scope.row.statusLabel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单备注" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.remark">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>
    </detail-block>
    <detail-block title="申贷订单">
      <el-table
        :data="creditOrderList"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="订单id" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.orderId">{{ scope.row.orderId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.productName">{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="贷款金额" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.loanAmount">{{ scope.row.loanAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="贷款周期" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.loanPeriod">{{ scope.row.loanPeriod }}</span>
          </template>
        </el-table-column>
        <el-table-column label="贷款费率" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.loanRate">{{ scope.row.loanRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.statusLabel">{{ scope.row.statusLabel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单时间" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.orderTime">{{ scope.row.orderTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单备注" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.remark">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>
    </detail-block>
  </div>
</template>

<script>
import DetailBlock from '../components/detailBlock'
export default {
  name: 'ApplyList',
  components: {
    DetailBlock
  },
  inject: ['userInfo'],
  computed: {
    creditCardOrderList() {
      return this.userInfo.data.creditCardOrderList || []
    },
    creditOrderList() {
      return this.userInfo.data.creditOrderList || []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
