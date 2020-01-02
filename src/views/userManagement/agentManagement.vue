<template>
  <div class="agent-management-container">
    <!--<el-button size="small" type="primary" plain @click="invitation(scope.row)">邀请区域经理</el-button>-->
    <div class="searching-box">
      <el-tabs v-model="activeName" @tab-click="onSearch">
        <el-tab-pane label="区域经理" name="1"></el-tab-pane>
        <el-tab-pane label="高级合伙人" name="2"></el-tab-pane>
        <el-tab-pane label="合伙人" name="3"></el-tab-pane>
        <el-tab-pane label="机构" name="4"></el-tab-pane>
      </el-tabs>
      <div class="pull-right">
        <el-button size="small" type="primary" plain @click="showInvitationQRCode(1)">邀请区域经理</el-button>
        <l-input-search v-model="searchText" @confirm="onSearch" />
      </div>
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
            <span v-null="scope.row.typeLabel">{{ scope.row.typeLabel }}</span>
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
        <el-table-column align="center" prop="createdAt" label="用户创建时间" width="105">
          <template slot-scope="scope">
            <span v-null="scope.row.createdAt">{{ scope.row.createdAt }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <div class="button-box">
              <el-button size="mini" type="primary" plain @click="openDetails(scope.row)">详情</el-button>
              <el-button size="mini" type="danger" plain @click="openLeave(scope.row)">离职</el-button>
              <el-button v-show="activeName !== '1'" size="mini" type="success" plain @click="clickPromotion(scope.row)">晋升</el-button>
              <el-button size="mini" type="primary" plain @click="invitation(scope.row)">生成邀请</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <l-pagination :api="api" :params="params" @list="getListData"></l-pagination>
    </div>
    <el-dialog
      title="选择被邀请人身份"
      :visible.sync="invitationDialogVisible"
      width="310px"
      center>
      <span>代理身份</span>
      <el-select v-model="invitationSelected" placeholder="请选择">
        <el-option
          v-for="item in invitationOptions[activeName]"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="invitationDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="showInvitationQRCode">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="微信二维码"
      :visible.sync="QRCodeUrlVisible"
      width="300px">
      <div class="tips">请管理员截图后发给需要绑定的用户</div>
      <canvas id="canvas"></canvas>
    </el-dialog>
    <el-dialog
      title="晋升"
      :visible.sync="dialogVisible"
      width="310px"
      center>
      <span>代理身份</span>
      <el-select v-model="agentSelected" placeholder="请选择">
        <el-option
          v-for="item in agentOptions[activeName]"
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
import { getAgents, agentPromotion, getQRCode } from '@/api/userManagement'
import { AGENT_INVITATION, AGENT_PROMOTION } from '@/utils/constants'
import QRCode from 'qrcode'

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
        type: 1
      },
      searchText: '',
      invitationDialogVisible: false,
      QRCodeUrlVisible: false,
      dialogVisible: false,
      invitationSelected: 0,
      agentSelected: 1,
      currentRow: {},
      invitationOptions: AGENT_INVITATION,
      agentOptions: AGENT_PROMOTION,
      listLoading: true,
      activeName: '1'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    activeName(val) {
      // 切换tab重置选择
      this.invitationSelected = 0
      this.agentSelected = 1
    }
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
    invitation(row) {
      this.currentRow = row
      this.invitationSelected = 0 // 重置选择
      this.invitationDialogVisible = true
    },
    async showInvitationQRCode(type) {
      this.invitationDialogVisible = false
      try {
        const params = {
          type: this.invitationSelected,
          userId: this.currentRow.userId
        }
        // 邀请区域经理
        if (type === 1) {
          params.type = 1
          params.userId = 0
        }
        console.log(params)
        const res = await getQRCode(params)
        this.QRCodeUrlVisible = true
        this.$nextTick(() => {
          const dom = document.getElementById('canvas')
          const options = {
            width: 256,
            height: 256
          }
          QRCode.toCanvas(dom, res.data.url, options, (error) => {
            if (error) {
              this.showMessage('error', '二维码生成失败！')
              this.QRCodeUrlVisible = false
              return
            }
            console.log('success!')
          })
        })
      } catch (e) {
        console.log(e)
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
      .pull-right {
        position: absolute;
        bottom: 19px;
        right: 0;
        .el-button {
          margin-right: 16px;
        }
      }
    }
    .button-box {
      display: flex;
      justify-content: center;
    }
    .tips {
      text-align: center;
      color: #999;
      font-size: 12px;
    }
  }
</style>
