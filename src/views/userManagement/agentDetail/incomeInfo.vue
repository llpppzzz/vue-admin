<template>
  <div class="tab-income-info">
    <detail-block title="佣金详情">
      <el-table
        :data="[]"
        border
        fit
        highlight-current-row
      >
        <span slot="pullLeft">2222fen</span>
        <el-table-column label="积分来源" align="center">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="积分获得时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="积分数额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
      </el-table>
    </detail-block>
    <detail-block title="积分详情">
      <el-table
        :data="[]"
        border
        fit
        highlight-current-row
      >
        <span slot="pullLeft">2222fen</span>
        <el-table-column label="积分来源" align="center">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="积分获得时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="积分数额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
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
  }
}
</script>

<style lang="scss" scoped>

</style>
