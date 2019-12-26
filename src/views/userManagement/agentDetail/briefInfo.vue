<template>
<div class="tab-brief-info">
  <el-row :gutter="20">
    <el-col :span="3"><div class="grid-content row-title">姓名：</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">蓄势待发</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="3"><div class="grid-content row-title">身份证：</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">213123123123123123</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="3"><div class="grid-content row-title">电话：</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">213123123123123123</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="3"><div class="grid-content row-title">工作单位：</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">213123123123123123</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="3"><div class="grid-content row-title">代理身份：</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">213123123123123123</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="3"><div class="grid-content row-title">上级名称：</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">213123123123123123</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'BriefInfo'
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
