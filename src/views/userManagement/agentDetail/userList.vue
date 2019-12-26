<template>
  <div class="tab-user-list">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="item in list" :key="item.id" :title="item.name" :name="item.id">
        <el-table
          v-loading="listLoading"
          :data="[]"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          stripe
        >
          <el-table-column label="订单ID" align="center">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="产品属性" align="center">
            <template slot-scope="scope">
              {{ scope.row.attribute }}
            </template>
          </el-table-column>
          <el-table-column label="产品名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单状态" align="center">
            <template slot-scope="scope">
              {{ scope.row.pageviews }}
            </template>
          </el-table-column>
          <el-table-column label="订单备注" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      listLoading: false,
      activeNames: '1',
      list: [{
        id: 123123,
        name: '老王',
        attribute: 'sdfsdf'
      }, {
        id: 123122,
        name: '老王',
        attribute: 'sdfsdf'
      }, {
        id: 123124,
        name: '老王',
        attribute: 'sdfsdf'
      }, {
        id: 123125,
        name: '老王',
        attribute: 'sdfsdf'
      }, {
        id: 123126,
        name: '老王',
        attribute: 'sdfsdf'
      }]
    }
  },
  methods: {
    handleChange() {}
  }
}
</script>

<style lang="scss" scoped>

</style>
