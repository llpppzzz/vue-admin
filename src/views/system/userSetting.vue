<template>
  <div class="user">
    <el-form ref="user" :model="user" status-icon :rules="rules2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="user.oldPassword" auto-complete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" type="password" auto-complete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="user.checkPass" type="password" auto-complete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="submitForm('user')">修改</el-button>
        <el-button plain @click="resetForm('user')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { updatePassword } from '@/api/setting'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      }
      callback()
    }
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.user.checkPass !== '') {
          this.$refs.user.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user: {
        oldPassword: '',
        password: '',
        checkPass: ''

      },
      rules2: {
        oldPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { oldPassword, password } = this.user
          updatePassword({ oldPassword, password })
          this.$message.success('修改成功!')
        } else {
          this.$message.error('请确认信息是否填写正确')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>
<style lang="scss" scoped>
  .user{
    position: relative;
  }
  .title{
    display: flex;
    justify-content: space-between;
    .title_h1{
      font-size: 24px;
      padding-left: 5px;
      border-left: 3px solid #bbbbbb;
      margin-bottom: 15px;
    }
  }
</style>
