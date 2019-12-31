<template>
  <div class="view-order-detail">
    <div class="brief-info">
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">姓名：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <span v-null="info.name">{{ info.name }}</span>
        </div></el-col>
        <el-col :span="3"><div class="grid-content row-title">工作单位：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <span v-null="info.company">{{ info.company }}</span>
        </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content row-title">电话</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <span v-null="info.mobile">{{ info.mobile }}</span>
        </div></el-col>
        <el-col :span="3"><div class="grid-content row-title">身份证：</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <span v-null="info.idCard">{{ info.idCard }}</span>
        </div></el-col>
      </el-row>
    </div>
    <el-table
      v-if="type === 'card'"
      :data="list"
      border
      fit
    >
      <el-table-column label="确认时间" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.createdDate" placeholder="请输入确认时间"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="订单备注" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" placeholder="请输入订单备注"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-else
      :data="list"
      border
      fit
    >
      <el-table-column label="放款金额" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.createdDate" placeholder="请输入放款金额"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="放款时间" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.createdDate" placeholder="请输入放款时间"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="费率" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.createdDate" placeholder="请输入费率"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="年限期数" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.createdDate" placeholder="请输入年限期数"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="订单备注" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.createdDate" placeholder="请输入订单备注"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-button-box">
      <el-button type="primary" plain @click="confirm">保存</el-button>
      <el-button type="info" plain @click="goBack">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  data() {
    return {
      type: this.$route.query.type || 'card',
      info: {},
      listLoading: false,
      list: [{}],
      options: [{
        label: '已通过',
        value: 1
      }, {
        label: '已拒绝',
        value: -1
      }, {
        label: '待审核',
        value: 2
      }]
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

<style lang="scss" scoped>
  .view-order-detail {
    background: #fff;
    /*padding: 16px;*/
    .grid-content {
      line-height: 32px;
    }
    .row-title {
      color: #909399;
    }
    .brief-info {
      margin-bottom: 24px;
    }
    .footer-button-box {
      margin-top: 24px;
    }
  }
</style>
