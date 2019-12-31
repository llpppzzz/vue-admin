<template>
  <div class="view-new-bank">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="银行图标">
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
      <el-form-item label="银行名称">
        <el-input v-model="form.bankName" />
      </el-form-item>
      <el-form-item label="是否上架">
        <el-radio v-model="form.display" label="1">是</el-radio>
        <el-radio v-model="form.display" label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="地区选择">
        <el-cascader
          placeholder="选择或搜索地区"
          :options="options"
          filterable>
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onSubmit">新建</el-button>
        <el-button type="info" plain @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'NewBank',
  data() {
    return {
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      options: [],
      form: {
        prodType: '1',
        bankName: '',
        display: ''
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
  .view-new-bank{
  }
</style>
