<template>
  <div class="tab-agent-list">
    <el-table
      :data="info"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.name"></span>{{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="身份证号" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.idCard"></span>{{ scope.row.idCard }}
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.mobile"></span>{{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="工作单位" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.company"></span>{{ scope.row.company }}
        </template>
      </el-table-column>
      <el-table-column label="佣金" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.priceAmount"></span>{{ scope.row.priceAmount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="积分">
        <template slot-scope="scope">
          <span v-null="scope.row.integral"></span>{{ scope.row.integral }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="代理身份">
        <template slot-scope="scope">
          <span v-null="scope.row.typeLabel"></span>{{ scope.row.typeLabel }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="申贷业务">
        <template slot-scope="scope">
          <span v-null="scope.row.creditApplyQuantity"></span>{{ scope.row.creditApplyQuantity }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="申卡业务">
        <template slot-scope="scope">
          <span v-null="scope.row.creditCardApplyQuantity"></span>{{ scope.row.creditCardApplyQuantity }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AgentList',
  inject: ['userInfo'],
  data() {
    return {
    }
  },
  computed: {
    info() {
      return this.userInfo.data.agencyList || []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
