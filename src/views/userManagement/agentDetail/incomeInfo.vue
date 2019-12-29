<template>
  <div class="tab-income-info">
    <detail-block title="佣金详情">
      <el-table
        :data="walletsLogList"
        border
        fit
        highlight-current-row
      >
        <span slot="pullLeft">2222</span>
        <el-table-column label="积分来源" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.orderId">{{ scope.row.orderId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="积分获得时间" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.orderId">{{ scope.row.orderId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="积分数额" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.orderId">{{ scope.row.orderId }}</span>
          </template>
        </el-table-column>
      </el-table>
    </detail-block>
    <detail-block title="积分详情">
      <span slot="pullLeft">{{ info.integral }}分</span>
      <el-table
        :data="integralsLogList"
        border
        fit
        highlight-current-row
      >
        <span slot="pullLeft">2222fen</span>
        <el-table-column label="积分来源" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.description">{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="积分获得时间" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.createdAt">{{ scope.row.createdAt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="积分数额" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.integral">{{ scope.row.integral }}</span>
          </template>
        </el-table-column>
      </el-table>
    </detail-block>
  </div>
</template>

<script>
import DetailBlock from '../components/detailBlock'
export default {
  name: 'IncomeInfo',
  components: {
    DetailBlock
  },
  inject: ['userInfo'],
  computed: {
    info() {
      return this.userInfo.data.user || {}
    },
    integralsLogList() {
      return this.userInfo.data.integralsLogList || []
    },
    walletsLogList() {
      return this.userInfo.data.walletsLogList || []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
