<template>
  <div class="agent-management-container">
    <div class="searching-box">
      <el-tabs v-model="activeName" @tab-click="onSearch">
        <el-tab-pane label="区域代理" name="3"></el-tab-pane>
        <el-tab-pane label="一级代理" name="1"></el-tab-pane>
        <el-tab-pane label="二级代理" name="2"></el-tab-pane>
        <el-tab-pane label="机构" name="4"></el-tab-pane>
      </el-tabs>
      <l-input-search v-model="searchText" @confirm="onSearch" />
    </div>
    <div class="table-box">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.name">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份证" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.idCard">{{ scope.row.idCard }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.mobile">{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工作单位" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.company">{{ scope.row.company }}</span>
          </template>
        </el-table-column>
        <el-table-column label="佣金" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.priceAmount">{{ scope.row.priceAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="积分" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.integral">{{ scope.row.integral }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="代理身份">
          <template slot-scope="scope">
            <span v-null="scope.row.type">{{ scope.row.type | agentType }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="上级名称">
          <template slot-scope="scope">
            <span v-null="scope.row.inviterUserName">{{ scope.row.inviterUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span v-null="scope.row.statusLabel">{{ scope.row.statusLabel }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createdAt" label="用户创建时间">
          <template slot-scope="scope">
            <span v-null="scope.row.createdAt">{{ scope.row.createdAt }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="230">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="openDetails(scope.row)">详情</el-button>
            <el-button size="mini" type="danger" plain @click="openLeave(scope.row)">离职</el-button>
            <el-button size="mini" type="success" plain @click="clickPromotion(scope.row)">晋升</el-button>
          </template>
        </el-table-column>
      </el-table>
      <l-pagination :api="api" :params="params" @list="getListData"></l-pagination>
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
        <el-button type="primary" @click="agentPromotion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAgents, agentPromotion } from '@/api/userManagement'

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
      list: [],
      api: getAgents,
      params: {
        page: 1,
        pageSize: 10,
        type: 3
      },
      searchText: '',
      dialogVisible: false,
      agentSelected: 3,
      currentRow: {},
      agentOptions: [{
        label: '区域代理',
        value: 3
      }, {
        label: '一级代理',
        value: 1
      }, {
        label: '二级代理',
        value: 2
      }, {
        label: '机构',
        value: 4
      }],
      listLoading: true,
      activeName: '3'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
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
        name: this.searchText,
        type: this.activeName
      })
    },
    clickPromotion(row) {
      this.currentRow = row
      this.dialogVisible = true
    },
    async agentPromotion() {
      try {
        const params = {
          type: this.agentSelected,
          userId: this.currentRow.userId
        }
        const res = agentPromotion(params)
        this.dialogVisible = false
        this.onSearch()
        this.$message.success(`操作成功！`)
      } catch (e) {
        this.dialogVisible = false
        this.$message.error(`操作失败：${e}`)
      }
    },
    openDetails(row) {
      this.$router.push({
        path: '/userManagement/agentDetail',
        query: {
          userId: row.userId
        }
      })
    },
    openLeave(row) {
      this.$router.push({
        path: '/userManagement/agentLeave',
        query: {
          userId: row.userId
        }
      })
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
