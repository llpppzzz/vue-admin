<template>
  <div class="view-user-detail">
    <!--<el-button class="get-back" type="primary" @click="$router.back()">返回列表</el-button>-->
    <div class="brief-info">
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">姓名：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" v-null="info.name">{{ info.name }}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">身份证：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" v-null="info.idCard">{{ info.idCard }}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">电话：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" v-null="info.mobile">{{ info.mobile }}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">工作单位：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" v-null="info.company">{{ info.company }}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">代理人：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" v-null="info.inviterUserName">{{ info.inviterUserName }}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <el-button type="primary" size="mini" plain @click="dialogVisible = true">修改</el-button>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
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
    <detail-block title="积分详情">
      <el-table
        :data="integralsLogList"
        border
        fit
        highlight-current-row
        stripe
      >
        <el-table-column label="积分来源" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.description">{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="积分获得时间" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.createdAt">{{ scope.row.createdAt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="积分数额" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.integral">{{ scope.row.integral }}</span>
          </template>
        </el-table-column>
      </el-table>
    </detail-block>
    <detail-block title="邀请用户列表">
      <el-table
        :data="inviteList"
        border
        fit
        highlight-current-row
        stripe
      >
        <el-table-column label="邀请用户" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.name">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邀请时间" align="center">
          <template slot-scope="scope">
            <span v-null="scope.row.createdAt">{{ scope.row.createdAt }}</span>
          </template>
        </el-table-column>
      </el-table>
    </detail-block>
    <bind-agent-dialog :visible.sync="dialogVisible"/>
  </div>
</template>

<script>
import DetailBlock from './components/detailBlock'
import BindAgentDialog from './components/bindAgentDialog'
import { getUsersInformation } from '@/api/userManagement'

export default {
  name: 'UserDetail',
  components: {
    DetailBlock,
    BindAgentDialog
  },
  data() {
    return {
      dialogVisible: false,
      userId: this.$route.query.userId || '',
      info: {},
      inviteList: [],
      integralsLogList: []
    }
  },
  created() {
    if (this.userId) {
      this.getUsersInformation()
    }
  },
  methods: {
    async getUsersInformation() {
      try {
        const res = await getUsersInformation({ userId: this.userId })
        this.info = res.data.user
        this.inviteList = res.data.inviteList || []
        this.integralsLogList = res.data.integralsLogList || []
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.view-user-detail {
  background: #fff;
  /*padding: 16px;*/
  .get-back {
    margin-bottom: 24px;
  }
  .grid-content {
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
