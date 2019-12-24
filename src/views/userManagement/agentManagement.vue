<template>
  <div class="agent-management-container">
    <div class="searching-box">
      <el-tabs v-model="activeName">
        <el-tab-pane label="区域代理" name="1"></el-tab-pane>
        <el-tab-pane label="一级代理" name="2"></el-tab-pane>
        <el-tab-pane label="二级代理" name="3"></el-tab-pane>
        <el-tab-pane label="机构" name="4"></el-tab-pane>
      </el-tabs>
      <l-input-search @confirm="onSearch" />
    </div>
    <div class="table-box">
      <el-table
        v-loading="listLoading"
        :data="list"
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
        <el-table-column label="身份证" align="center">
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
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="积分" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="代理身份">
          <template slot-scope="scope">
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="上级名称">
          <template slot-scope="scope">
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="用户创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="openDetails(scope.row)">详情</el-button>
            <el-button type="text" @click="openLeave(scope.row)">离职</el-button>
            <el-button type="text" @click="openLeave(scope.row)">晋升</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList } from '@/api/table'

export default {
  name: 'AgentManagement',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      // listLoading: true,
      activeName: '1',
      searchingInfo: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    onSearch() {},
    openDetails(row) {
      this.$router.push({ name: 'agentDetail' })
    },
    openLeave(row) {
      this.$router.push({ name: 'agentLeave' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .agent-management-container {
    .searching-box {
      position: relative;
      .l-input-search {
        position: absolute;
        bottom: 19px;
        right: 0;
      }
      .el-input {
        width: 200px;
      }
    }
  }
</style>
