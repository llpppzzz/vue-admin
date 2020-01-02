<template>
  <div class="user-management-container">
    <div class="searching-box">
      <l-input-search v-model="searchText" @confirm="onSearch" />
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="姓名" prop="name" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证" prop="idCard" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.idCard">{{ scope.row.idCard }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" prop="mobile" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.mobile">{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作单位" prop="company" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.company">{{ scope.row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="积分" prop="integral" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.integral">{{ scope.row.integral }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理人" prop="inviterUserName" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.inviterUserName">{{ scope.row.inviterUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户创建时间" prop="createdAt" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.createdAt">{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="created_at" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openDetails(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <l-pagination :api="api" :params="params" @list="getListData"></l-pagination>
  </div>
</template>

<script>
import { getUsers } from '@/api/userManagement'

export default {
  name: 'NormalUserManagement',
  data() {
    return {
      list: [],
      api: getUsers,
      params: {
        page: 1,
        pageSize: 20
      },
      listLoading: true,
      searchText: ''
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  methods: {
    getListData(data) {
      console.log(data)
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
        name: this.searchText
      })
    },
    openDetails(row) {
      this.$router.push({
        path: '/userManagement/userDetail',
        query: {
          userId: row.userId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-management-container {
    .searching-box {
      padding: 0 0 16px 0;
    }
  }
</style>
