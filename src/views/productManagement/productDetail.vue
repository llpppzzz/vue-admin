<template>
  <div class="view-product-detail">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="产品图标">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button plain size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品类型选择">
        <el-radio v-model="form.prodType" label="1">分期类产品</el-radio>
        <el-radio v-model="form.prodType" label="2">循环类产品</el-radio>
      </el-form-item>
      <el-form-item label="银行名称">
        <el-input v-model="form.bankName" />
      </el-form-item>
      <el-form-item label="借贷产品名称">
        <el-input v-model="form.prodName" />
      </el-form-item>
      <el-form-item label="产品标签">
        <el-select
          v-model="form.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择产品标签">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="额度">
        <el-col :span="11">
          <el-input v-model="form.num1" type="number" placeholder="最小额度" style="width: 100%;" >
            <span class="suffix-text" slot="suffix">元</span>
          </el-input>
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-input v-model="form.num2" type="number" placeholder="最大额度" style="width: 100%;" >
            <span class="suffix-text" slot="suffix">元</span>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="费率">
        <el-col :span="11">
          <el-input v-model="form.num1" type="number" placeholder="最小还款费率" style="width: 100%;" >
            <span class="suffix-text" slot="suffix">%</span>
          </el-input>
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-input v-model="form.num2" type="number" placeholder="最高还款费率" style="width: 100%;" >
            <span class="suffix-text" slot="suffix">%</span>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="周期">
        <el-col :span="11">
          <el-input v-model="form.num1" type="number" placeholder="最短还款期限" style="width: 100%;" >
            <span class="suffix-text" slot="suffix">元</span>
          </el-input>
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-input v-model="form.num2" type="number" placeholder="最长还款期限" style="width: 100%;" >
            <span class="suffix-text" slot="suffix">元</span>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="产品亮点">
        <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item label="申请要求">
        <vue-ueditor-wrap v-model="msg1" :config="myConfig"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item label="产品介绍">
        <vue-ueditor-wrap v-model="msg2" :config="myConfig"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onSubmit">确认</el-button>
        <el-button type="info" plain @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { UEDITOR_CONFIG } from '@/utils/constants'
export default {
  name: 'ProductDetail',
  data() {
    return {
      myConfig: UEDITOR_CONFIG,
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      msg: '',
      msg1: '',
      msg2: '',
      options: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      form: {
        prodType: '1',
        bankName: '',
        prodName: '',
        tags: [],
        num1: '',
        num2: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped>
  .view-product-detail{
    .line {
      text-align: center;
    }
    .suffix-text {
      padding: 0 15px;
    }
  }
</style>
