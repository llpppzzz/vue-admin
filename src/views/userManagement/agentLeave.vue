<template>
  <div class="view-agent-leave">
    <div class="brief-info">
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">姓名：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">蓄势待发</div></el-col>
        <el-col :span="3"><div class="grid-content row-title">身份证：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">213123123123123123</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">工作单位：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">213123123123123123</div></el-col>
        <el-col :span="3"><div class="grid-content row-title">电话：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">213123123123123123</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">代理身份：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">213123123123123123</div></el-col>
        <el-col :span="3"><div class="grid-content row-title">上级名称：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">213123123123123123</div></el-col>
      </el-row>
    </div>
    <detail-block title="客户信息">
      <el-button slot="pullRight" size="small" type="primary" plain @click="dialogVisible = true">一键绑定</el-button>
      <el-table
        :data="[]"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="电话" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="身份证号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工作单位" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="绑定对象" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
      </el-table>
    </detail-block>
    <detail-block title="下级信息">
      <el-button slot="pullRight" size="small" type="primary" plain @click="dialogVisible = true">一键绑定</el-button>
      <el-table
        :data="[]"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="电话" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="身份证号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工作单位" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="代理身份" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="绑定对象" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
      </el-table>
    </detail-block>
    <div class="footer-button-box">
      <el-button type="primary" plain @click="confirm">确认离职</el-button>
      <el-button type="info" plain @click="goBack">返回</el-button>
    </div>
    <bind-agent-dialog :visible.sync="dialogVisible"/>
  </div>
</template>

<script>
import DetailBlock from './components/detailBlock'
import BindAgentDialog from './components/bindAgentDialog'
export default {
  name: 'AgentLeave',
  components: {
    DetailBlock,
    BindAgentDialog
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    confirm() {},
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.view-agent-leave {
  padding: 16px;
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
