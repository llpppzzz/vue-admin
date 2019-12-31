<template>
  <div class="view-bank-management">
    <div class="searching-box">
      <l-date-picker v-model="dateRange" @change="reloadList"></l-date-picker>
      <el-button size="small" type="primary" plain @click="openDetails">新建银行</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="银行名称" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否上架" align="center">
        <template slot-scope="scope">
          <span v-null="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="180">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" content="编辑" placement="top-start">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="删除" placement="top-start">
            <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </el-tooltip>
          <el-button size="mini" type="success" plain @click="openDetails(scope.row)">上架</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'BankManagement',
  data() {
    return {
      dateRange: [],
      listLoading: false,
      list: [{}]
    }
  },
  methods: {
    reloadList(val) {
      console.log(this.dateRange)
    },
    onSearch() {},
    openDetails(row) {
      this.$router.push({ path: '/productManagement/newBank' })
    }
  }
}
</script>

<style lang="scss">
  .view-bank-management {
    background: #fff;
    .searching-box {
      padding: 0 0 16px 0;
      display: flex;
      justify-content: space-between;
      .el-input {
        width: 200px;
      }
    }
  }
</style>
