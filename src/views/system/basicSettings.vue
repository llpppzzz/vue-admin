<template>
  <div class="view-basic-settings">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="产品图标">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" plain type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="协议上传">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :limit="1"
          :file-list="fileList">
          <el-button size="small" plain type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="常见问答">
        <vue-ueditor-wrap v-model="form.msg" :config="myConfig"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { UEDITOR_CONFIG } from '@/utils/constants'
export default {
  name: 'BasicSettings',
  data() {
    return {
      myConfig: UEDITOR_CONFIG,
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      form: {
        msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
      }
    }
  },
  created() {
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
  .view-basic-settings{
    .sub-title {
      color: #606266
    }
    .suffix-text {
      padding: 0 10px;
    }
  }
</style>
