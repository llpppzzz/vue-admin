<template>
  <div class="tab-brief-info">
    <el-row v-for="item in dataArr" :key="item.field" :gutter="20" >
      <el-col :span="3"><div class="grid-content row-title">{{ item.title }}：</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <span v-null="info[item.field]">{{ info[item.field] }}</span>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BriefInfo',
  inject: ['userInfo'],
  data() {
    return {
      dataArr: [{
        title: '姓名',
        field: 'name'
      }, {
        title: '身份证',
        field: 'idCard'
      }, {
        title: '电话',
        field: 'mobile'
      }, {
        title: '工作单位',
        field: 'company'
      }, {
        title: '代理身份',
        field: 'typeLabel'
      }, {
        title: '上级名称',
        field: 'inviterUserName'
      }]
    }
  },
  computed: {
    info() {
      return this.userInfo.data.user || {}
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-brief-info{
  background: #fff;
  .grid-content {
    line-height: 32px;
  }
}
</style>
