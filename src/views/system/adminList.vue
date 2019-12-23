<template>
  <div style="padding:0 15px">
    <div class="Interactive" style="margin:10px;display:flex">
      <el-button type="success" size="mini" @click="dialogNewUserFormVisible = true">新增用户</el-button>
      <el-input
        v-model="sendList.search"
        style="width:220px;"
        placeholder="请输入内容"
      >

        <el-button slot="append" icon="el-icon-search" @click="search" />
      </el-input>
    </div>
    <el-table
      :data="list"
      border
      style="width: 100%; "
    >
      <el-table-column label="管理员名称" align="center" prop="id" width="260">
        <template slot-scope="scope">
          <span>{{ scope.row.realname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录账户" align="center" prop="id" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.loginName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center" prop="id" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.phone?scope.row.phone:'无' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="id" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.userStat===1?'启用中':'已禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="id">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="id" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.remarks?scope.row.remarks:'无' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" prop="id">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="编辑用户信息" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="editInfo(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="修改密码" placement="top">
            <el-button type="primary" icon="el-icon-refresh" @click="editPass(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="设置角色" placement="top">
            <el-button type="primary" icon="el-icon-setting" @click="assignRoles(row)" />
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" content="删除用户" placement="top">
            <el-button type="danger" icon="el-icon-delete" @click="deleteRoles(row)" />
          </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="sendList.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="sendList.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog title="编辑用户信息" :visible.sync="dialogUserFormVisible" width="450px">
      <el-form ref="userInfo" :model="form" :rules="rules">
        <el-form-item label="管理员名称" :label-width="'120px'" prop="realname">
          <el-input v-model="form.realname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系号码" :label-width="'120px'">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否启用" :label-width="'120px'">
          <el-switch v-model="form.userStat" active-text="启用" inactive-text="禁用" />
        </el-form-item>
        <el-form-item label="备注" :label-width="'120px'">
          <el-input v-model="form.remarks" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUserInfo('userInfo')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改用户密码" :visible.sync="dialogPassFormVisible" width="450px">
      <el-form ref="password" :model="passform" :rules="rules">
        <!-- <el-form-item label="请输入旧密码" :label-width="'120px'" prop="oldPass">
          <el-input v-model="passform.oldPass" autocomplete="off" />
        </el-form-item> -->
        <el-form-item label="请输入新密码" :label-width="'120px'" prop="password">
          <el-input v-model="passform.password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPassFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditPass('password')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配用户角色" :visible.sync="dialogRoleFormVisible" width="550px">

      <el-transfer v-model="nowRole" :titles="['所有角色', '拥有角色']" :data="roleStore" :props="{key:'roleId',label:'name'}" />

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditRole()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="用户信息" :visible.sync="dialogNewUserFormVisible" width="450px">
      <el-form ref="newUserInfo" :model="newForm" :rules="rules">
        <el-form-item label="登录账户" :label-width="'120px'" prop="loginName">
          <el-input v-model="newForm.loginName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="姓名" :label-width="'120px'" prop="realname">
          <el-input v-model="newForm.realname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="'120px'" prop="password">
          <el-input v-model="newForm.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系号码" :label-width="'120px'" prop="phone">
          <el-input v-model="newForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否启用" :label-width="'120px'">
          <el-switch v-model="newForm.userStat" active-text="启用" inactive-text="禁用" />
        </el-form-item>
        <el-form-item label="备注" :label-width="'120px'">
          <el-input v-model="newForm.remarks" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newUser('newUserInfo')">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import * as user from '@/api/account'
import { getRouter } from '@/api/router'
export default {

  data() {
    return {
      list: [], // 接收服务器返回数据的数组
      rules: {// 表单验证规则
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        loginName: [{ required: true, message: '请输入登录账户', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        // oldPass: [{ required: true, message: '旧密码', trigger: 'blur' }],
        // newPass: [{ required: true, message: '新密码', trigger: 'blur' }],
        realname: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      },
      dialogUserFormVisible: false, // dialog的显示/隐藏
      dialogPassFormVisible: false, // dialog的显示/隐藏
      dialogRoleFormVisible: false, // dialog的显示/隐藏
      dialogNewUserFormVisible: false,
      sendList: {// 向服务器发送数据的数组
        search: null, // 搜索关键字
        pageSize: 20, // 当前显示页数
        page: 1// 当前页数
      },
      total: 1,
      form: {
        realname: null,
        phone: null,
        userStat: null,
        remarks: null
      },
      id: null,
      newForm: {
        loginName: null,
        realname: null,
        password: null,
        phone: null,
        userStat: false,
        remarks: null
      },
      newFormCopy: null,
      passform: {// 修改密码的表单
        // oldPass: null,
        password: null
      },
      delArr: [],
      nowRole: [],
      roleStore: []

    }
  },

  mounted() {
    this.newFormCopy = { ...this.newForm }
    this.getlist()
    getRouter().then(res => {
      console.log(res)
    })
  },
  methods: {
    editInfo(row) {
      this.dialogUserFormVisible = true
      this.form = { ...row }
      this.form.userStat = row.userStat == 1
      console.log(this.form.userStat)
      console.log(row.userStat)
    },
    submitUserInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { accountId, loginName, realname, userStat } = this.form
          userStat = userStat ? 1 : 2
          console.log(userStat, '111')

          user.updateUser({ accountId, loginName, realname, userStat }).then(res => {
            console.log(res)
            this.dialogUserFormVisible = false
            this.$message.success('修改成功')
            this.getlist()
          })
        } else {
          this.$message.error('请完善用户信息')
          return false
        }
      })
    },
    submitEditPass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          user.editPass(this.passform).then(res => {
            console.log(res)
            this.$message.success('修改成功')
          })
        } else {
          this.$message.error('请完善用户信息')
          return false
        }
      })
    },
    assignRoles(row) {
      this.nowRole = []
      this.dialogRoleFormVisible = true
      user.getRoleAll().then(res => {
        this.roleStore = res.data.data
        console.log(this.roleStore)
        this.id = row.accountId
        user.getRole(this.id).then(res => {
          console.log(res)
          res.data.forEach(e => {
            e.checked ? this.nowRole.push(e.id) : ''
          })
        })
      })
    },
    editPass(row) {
      this.dialogPassFormVisible = true
      this.passform.accountId = row.accountId
    },
    submitEditRole() {
      console.log(this.nowRole)
      user.editRole({ accountId: this.id, roleIds: this.nowRole.join(',') }).then(res => {
        console.log(res)
        this.dialogRoleFormVisible = false
        this.$message.success('角色添加成功')
        this.nowRole = []
      })
    },
    // deleteRoles(row) {
    //   this.delArr.push(row.id)
    //   this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功!'
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.sendList.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.sendList.page = val
    },
    newUser(formName) {
      console.log(1)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.newForm.userStat = this.newForm.userStat ? 1 : 2
          console.log(this.newForm.userStat)
          user.newUser(this.newForm).then(res => {
            console.log(res)
            this.$message.success('保存成功')
            this.dialogNewUserFormVisible = false
            this.getlist()
          })
        } else {
          this.$message.error('请完善用户信息')
          return false
        }
      })
      //   newItem(this.form).then(res => {
      //     console.log(res)
      //   })
    },

    search() {
    //   this.getlist(this.sendList)
    },
    getlist(data) {
      user.userList(data).then(res => {
        this.list = res.data.data
        this.total = res.data.totalCount - 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Interactive{
    justify-content: space-between;
}
</style>
