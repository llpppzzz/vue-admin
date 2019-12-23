<template>
  <div class="view-agent-detail">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="1"></el-tab-pane>
      <el-tab-pane label="申请列表" name="2"></el-tab-pane>
      <el-tab-pane label="收支详情" name="3"></el-tab-pane>
      <el-tab-pane label="用户列表" name="4"></el-tab-pane>
      <el-tab-pane label="代理列表" name="5"></el-tab-pane>
    </el-tabs>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
</template>

<script>
import BriefInfo from './briefInfo'
import ApplyList from './applyList'
import IncomeInfo from './incomeInfo'
import UserList from './userList'
import AgentList from './agentList'
export default {
  name: 'AgentDetail',
  components: {
    BriefInfo,
    ApplyList,
    IncomeInfo,
    UserList,
    AgentList
  },
  data() {
    return {
      activeName: '1'
    }
  },
  computed: {
    currentView() {
      switch (this.activeName) {
        case '1':
          return BriefInfo
        case '2':
          return ApplyList
        case '3':
          return IncomeInfo
        case '4':
          return UserList
        case '5':
          return AgentList
        default:
          return BriefInfo
      }
    }
  }
}
</script>

<style scoped>

</style>
