<template>
  <div class="agent-management-container">
    <div class="searching-box">
      <el-tabs v-model="activeName" @tab-click="getAgents">
        <el-tab-pane label="区域代理" name="3"></el-tab-pane>
        <el-tab-pane label="一级代理" name="1"></el-tab-pane>
        <el-tab-pane label="二级代理" name="2"></el-tab-pane>
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
        <el-table-column align="center" prop="created_at" label="操作" width="230">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="openDetails(scope.row)">详情</el-button>
            <el-button size="mini" type="danger" plain @click="openLeave(scope.row)">离职</el-button>
            <el-button size="mini" type="success" plain @click="dialogVisible = true">晋升</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="晋升"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <span>代理身份</span>
      <el-select v-model="agentSelected" placeholder="请选择">
        <el-option
          v-for="item in agentOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAgents } from '@/api/userManagement'

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
      list: [{}],
      dialogVisible: false,
      agentSelected: '',
      agentOptions: [{
        label: '区域代理',
        value: 3
      }, {
        label: '一级代理',
        value: 1
      }, {
        label: '二级代理',
        value: 2
      }],
      listLoading: false,
      activeName: '3',
      searchingInfo: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getAgents()
  },
  methods: {
    async getAgents() {
      try {
        const params = {
          page: 1,
          pageSize: 10,
          type: this.activeName
        }
        const res = await getAgents(params)
      } catch (e) {
        console.log(e)
      }
    },
    onSearch() {},
    openDetails(row) {
      this.$router.push({ path: '/userManagement/agentDetail' })
    },
    openLeave(row) {
      this.$router.push({ path: '/userManagement/agentLeave' })
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
