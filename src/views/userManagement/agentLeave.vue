<template>
  <div class="view-agent-leave">
    <div class="brief-info">
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">姓名：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <span v-null="userInfo.name">{{ userInfo.name }}</span>
        </div></el-col>
        <el-col :span="3"><div class="grid-content row-title">身份证：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <span v-null="userInfo.idCard">{{ userInfo.idCard }}</span>
        </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">工作单位：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <span v-null="userInfo.company">{{ userInfo.company }}</span>
        </div></el-col>
        <el-col :span="3"><div class="grid-content row-title">电话：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <span v-null="userInfo.mobile">{{ userInfo.mobile }}</span>
        </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">代理身份：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <span v-null="userInfo.typeLabel">{{ userInfo.typeLabel }}</span>
        </div></el-col>
        <el-col :span="3"><div class="grid-content row-title">上级名称：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <span v-null="userInfo.inviterUserName">{{ userInfo.inviterUserName }}</span>
        </div></el-col>
      </el-row>
    </div>
    <detail-block title="下级信息">
      <el-button :disabled="selection.length < 1" slot="pullRight" size="small" type="primary" plain @click="dialogVisible = true">一键绑定</el-button>
      <el-table
        :data="list"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.name">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.mobile">{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份证号" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.idCard">{{ scope.row.idCard }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工作单位" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.company">{{ scope.row.company }}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理身份" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.typeLabel">{{ scope.row.typeLabel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.createdAt">{{ scope.row.createdAt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="绑定对象" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.inviterUserName">{{ scope.row.inviterUserName }}</span>
          </template>
        </el-table-column>
      </el-table>
      <l-pagination :api="listApi" :params="params" @list="getListData"></l-pagination>
    </detail-block>
    <div class="footer-button-box">
      <el-button :disabled="!!list.length" type="primary" plain @click="confirm">确认离职</el-button>
      <el-button type="info" plain @click="goBack">返回</el-button>
    </div>
    <bind-agent-dialog :visible.sync="dialogVisible"/>
  </div>
</template>

<script>
import DetailBlock from './components/detailBlock'
import BindAgentDialog from './components/bindAgentDialog'
import { getAgentInformation, getAgents, agentQuit } from '@/api/userManagement'

export default {
  name: 'AgentLeave',
  components: {
    DetailBlock,
    BindAgentDialog
  },
  data() {
    const userId = this.$route.query.userId || ''
    return {
      dialogVisible: false,
      userId: userId,
      userInfo: {},
      selection: [],
      list: [],
      listApi: getAgents,
      params: {
        inviterUserId: userId,
        page: 1,
        pageSize: 20
      }
    }
  },
  computed: {
    idArr() {
      return this.selection.map(data => data.userId)
    }
  },
  created() {
    this.getAgentInformation()
  },
  methods: {
    async getAgentInformation() {
      try {
        const res = await getAgentInformation({ userId: this.userId })
        this.userInfo = res.data.user
      } catch (e) {
        console.log(e)
      }
    },
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
    confirm() {
      this.$confirm('', '确认离职？', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        center: true
      }).then(async() => {
        try {
          const params = {
            userId: this.userId
          }
          const res = await agentQuit(params)
          this.$message.success('操作成功')
          this.goBack()
        } catch (e) {
          this.$message.error('操作失败')
        }
      }).catch((action) => {
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.selection = val
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.view-agent-leave {
  /*padding: 16px;*/
  .grid-content {
    min-height: 32px;
    line-height: 32px;
  }
  .row-title {
    color: #909399;
  }
  .brief-info {
    margin-bottom: 24px;
  }
}
</style>
