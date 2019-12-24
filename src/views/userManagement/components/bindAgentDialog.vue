<template>
  <el-dialog
    title="选择绑定代理人"
    :visible.sync="isShow"
    width="50%"
    center>
    <div class="agent-leave-dialog">
      <l-input-search @confirm="onSearch" />
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
        <el-table-column label="代理身份" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="上级名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button plain @click="isShow = false">取 消</el-button>
    <el-button type="primary" plain @click="isShow = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'BindAgentDialog',
  props: {
    type: {
      type: String,
      default: 'customer'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      listLoading: false,
      list: [{}]
    }
  },
  watch: {
    isShow(val, oldVal) {
      if (val !== oldVal) {
        this.$emit('update:visible', val)
      }
    },
    visible(val, oldVal) {
      if (val !== oldVal) {
        this.isShow = val
      }
    }
  },
  methods: {
    onSearch() {}
  }
}
</script>

<style lang="scss" scoped>
.agent-leave-dialog {
  .l-input-search {
    width: 100%;
    margin-bottom: 24px;
  }
}
</style>
