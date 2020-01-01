<template>
  <div class="view-card-detail">
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
      <el-form-item label="产品名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="产品副标题">
        <el-input v-model="form.subName" />
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
      <el-form-item label="促销活动">
        <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item label="产品介绍">
        <vue-ueditor-wrap v-model="msg1" :config="myConfig"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item label="结算规则">
        <vue-ueditor-wrap v-model="msg2" :config="myConfig"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item label="佣金设置">
        <el-row>
          <el-col :span="6"><div class="grid-content">
            <span class="sub-title">佣金金额</span>
            <el-input v-model="commission" size="small" type="number">
              <span class="suffix-text" slot="suffix">元</span>
            </el-input>
          </div></el-col>
          <el-col :span="6"><div class="grid-content"></div></el-col>
          <el-col :span="6"><div class="grid-content"></div></el-col>
          <el-col :span="6"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content">
            <span class="sub-title">高级合伙人分佣</span>
            <el-input v-model="commission" size="small" type="number">
              <span class="suffix-text" slot="suffix">%</span>
            </el-input>
          </div></el-col>
          <el-col :span="6"><div class="grid-content">
            <span class="sub-title">合伙人分佣</span>
            <el-input v-model="commission" size="small" type="number">
              <span class="suffix-text" slot="suffix">%</span>
            </el-input>
          </div></el-col>
          <el-col :span="6"><div class="grid-content">
            <span class="sub-title">区域代理分佣</span>
            <el-input v-model="commission" size="small" type="number">
              <span class="suffix-text" slot="suffix">%</span>
            </el-input>
          </div></el-col>
          <el-col :span="6"><div class="grid-content">
            <span class="sub-title">机构分佣</span>
            <el-input v-model="commission" size="small" type="number">
              <span class="suffix-text" slot="suffix">%</span>
            </el-input>
          </div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="积分设置">
        <el-row>
          <el-col :span="8"><div class="grid-content">
            <span class="sub-title">积分有效期</span>
            <el-input v-model="commission" size="small" type="number">
              <span class="suffix-text" slot="suffix">天</span>
            </el-input>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content">
            <span class="sub-title">高级合伙人积分</span>
            <el-input v-model="commission" size="small" type="number">
              <span class="suffix-text" slot="suffix">分</span>
            </el-input>
          </div></el-col>
          <el-col :span="8"><div class="grid-content">
            <span class="sub-title">合伙人积分</span>
            <el-input v-model="commission" size="small" type="number">
              <span class="suffix-text" slot="suffix">分</span>
            </el-input>
          </div></el-col>
          <el-col :span="8"><div class="grid-content">
            <span class="sub-title">区域代理积分</span>
            <el-input v-model="commission" size="small" type="number">
              <span class="suffix-text" slot="suffix">分</span>
            </el-input>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content">
            <span class="sub-title">一级用户积分</span>
            <el-input v-model="commission" size="small" type="number">
              <span class="suffix-text" slot="suffix">分</span>
            </el-input>
          </div></el-col>
          <el-col :span="8"><div class="grid-content">
            <span class="sub-title">二级用户积分</span>
            <el-input v-model="commission" size="small" type="number">
              <span class="suffix-text" slot="suffix">分</span>
            </el-input>
          </div></el-col>
          <el-col :span="8"><div class="grid-content">
            <span class="sub-title">机构积分</span>
            <el-input v-model="commission" size="small" type="number">
              <span class="suffix-text" slot="suffix">分</span>
            </el-input>
          </div></el-col>
        </el-row>
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
  name: 'CardDetail',
  data() {
    return {
      myConfig: UEDITOR_CONFIG,
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
      msg1: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
      msg2: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
      commission: 0,
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
        name: '',
        subName: '',
        tags: []
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
.view-card-detail{
  .sub-title {
    width: 97px;
    margin-right: 8px;
    text-align: right;
    flex-shrink: 0;
    color: #606266;
    white-space: nowrap;
  }
  .suffix-text {
    padding-right: 8px;
  }
  .grid-content {
    display: flex;
  }
}
</style>
