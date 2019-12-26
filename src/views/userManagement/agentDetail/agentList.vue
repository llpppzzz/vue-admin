<template>
  <div class="tab-agent-list">
    <el-table
      v-loading="listLoading"
      :data="[]"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="身份证号" align="center">
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
      <el-table-column label="佣金" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="积分">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="代理身份">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="申贷业务">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="申卡业务">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AgentList',
  data() {
    return {
      listLoading: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
