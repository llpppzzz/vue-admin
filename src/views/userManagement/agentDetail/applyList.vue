<template>
  <div class="tab-apply-list">
    <detail-block title="申卡订单">
      <el-table
        :data="[]"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="订单id" align="center">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="产品名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单备注" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
      </el-table>
    </detail-block>
    <detail-block title="申贷订单">
      <el-table
        :data="[]"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="订单id" align="center">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="产品名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="贷款金额" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="产品名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="贷款周期" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="贷款费率" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单备注" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
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
  }
}
</script>

<style lang="scss" scoped>

</style>
