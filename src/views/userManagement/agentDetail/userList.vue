<template>
  <div class="tab-user-list">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="item in customerList"
        :key="item.userName"
        :title="`用户名称:${item.userName}   注册时间:${item.registerTime}`"
        :name="item.userName">
        <el-table
          :data="item.productList"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="订单ID" align="center">
            <template slot-scope="scope">
              <span v-null="scope.row.orderId">{{ scope.row.orderId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品属性" align="center">
            <template slot-scope="scope">
              <span v-null="scope.row.categoryLabel">{{ scope.row.categoryLabel }}</span>
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
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      activeNames: ''
    }
  },
  inject: ['userInfo'],
  computed: {
    customerList() {
      return this.userInfo.data.customerList || []
    }
  },
  methods: {
    handleChange() {}
  }
}
</script>

<style lang="scss" scoped>

</style>
