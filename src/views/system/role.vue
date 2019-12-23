<template>
  <div style="padding:0 15px">
    <div class="Interactive" style="margin:10px;display:flex">
      <el-button type="success" size="mini" @click="dialogNewUserFormVisible=true">新增角色</el-button>
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
      <el-table-column label="角色名称" align="center" prop="id" width="260">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="id">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" prop="id">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="分配角色权限" placement="top">
            <el-button type="primary" icon="el-icon-menu" @click="editInfo(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑角色" placement="top">
            <el-button type="primary" icon="el-icon-setting" @click="editRoles(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
            <el-button type="danger" icon="el-icon-delete" @click="deleteRoles(row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="1"
      :page-sizes="[20, 30, 40]"
      :page-size="sendList.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog class="tres" title="请分配角色" :visible.sync="dialogEditRoleRootFormVisible" width="450px">
      <el-tree
        ref="tree"
        :data="roleRoot"
        show-checkbox
        node-key="funId"
        :default-expanded-keys="defaultOpen"
        :default-checked-keys="checked"
        :default-expand-all="false"
        :props="defaultProps"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditRoleRootFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRole()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑角色信息" :visible.sync="dialogEditRoleInfoFormVisible" width="450px">
      <el-form ref="RoleInfo" :model="editRoleform" :rules="rules">
        <el-form-item label="角色名" :label-width="'120px'" prop="name">
          <el-input v-model="editRoleform.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditRoleInfoFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRoleInfo('RoleInfo')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="用户信息" :visible.sync="dialogNewUserFormVisible" width="450px">
      <el-form ref="newRoleInfo" :model="newForm" :rules="rules">
        <el-form-item label="角色名" :label-width="'80px'" prop="name">
          <el-input v-model="newForm.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newRole('newRoleInfo')">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>

import * as role from '@/api/role'
// import { Loading } from 'element-ui'
export default {

  data() {
    return {
      list: [], // 角色列表
      newForm: {// 新建用户//
        name: null
      },
      rules: {// 表单验证规则
        name: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
      },
      dialogEditRoleRootFormVisible: false, // 角色权限dialog的显示/隐藏
      dialogEditRoleInfoFormVisible: false, // 编辑角色信息dialog的显示/隐藏
      dialogNewUserFormVisible: false, // 新增用户的dialog显示/隐藏
      sendList: {// 向服务器发送数据的数组
        search: null, // 搜索关键字
        pageSize: null, // 当前显示页数
        page: 0// 当前页数
      },
      total: null, // 总条数
      roleId: null,
      editRoleform: {// 修改角色信息的表单
        name: null,
        roleId: null
      },
      roleRoot: [], // 所有权限树状图
      loading: true,
      defaultOpen: [], // 树形图的默认展开节点
      checked: [], // 树形图的默认选择节点
      defaultProps: {// 设置树形图中关联节点的属性
        children: 'funs',
        label: 'name'
      }

    }
  },
  mounted() {
    let { sendList } = this
    this.getlist(sendList)
  },
  methods: {
    setCurrentKey(key) {
      console.log(key)
    },

    editInfo(row) { // 展开角色权限树状图
      // let options = {
      //   target: '.tres'
      // }
      // Loading.service(options)//全屏loading
      this.checked = []
      this.dialogEditRoleRootFormVisible = true
      this.roleId = row.roleId
      role.getRoleTree(row.roleId).then(res => {
        this.roleRoot = res.data
        res.data.forEach(e => {
          if (e.funs.length > 0) {
            console.log(1)
            e.funs.forEach(e1 => {
              if (e1.funs.length > 0) {
                console.log(2)
                e1.funs.forEach(e2 => {
                  if (e2.permissions) {
                    this.checked.push(e2.funId)
                  }
                })
              } else {
                if (e1.permissions) {
                  this.checked.push(e1.funId)
                }
              }
            })
          }
        })
        console.log(this.checked, '11')
      })
    },
    submitRoleInfo(formName) { // 编辑角色信息提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          role.updateRole(this.editRoleform).then(res => {
            this.getlist()
          })
          this.$message.success('修改成功')
          this.dialogEditRoleInfoFormVisible = false
        } else {
          this.$message.error('请完善用户信息')
          return false
        }
      })
    },
    async submitRole() { // 角色权限树形图提交
      let arr = this.$refs.tree.getCheckedNodes()
      console.log(arr, 'arr')

      // console.log(arr)
      let temp = []
      for (let i = 0; i < arr.length; i++) {
        temp.push(arr[i].funId + ',' + arr[i].parentId)
      }

      console.log(temp, 'temp')
      temp = temp.join(',').split(',')
      console.log(temp, '1111')

      temp = [...new Set(temp)]

      var ar = []
      temp.forEach(e => {
        if (e !== 'null') {
          ar.push(e)
        }
      })
      console.log(this.roleId, ar.join(','))

      let res = await role.setRole({ roleId: this.roleId, funIds: ar.join(',') })
      if (res.status === 200) {
        this.$message.success('角色权限修改成功')
        this.dialogEditRoleRootFormVisible = false
        this.checked = []
      } else {
        this.$message.error('失败')
      }
    },
    editRoles(row) { // 显示编辑角色信息遮罩
      this.dialogEditRoleInfoFormVisible = true
      console.log(row)

      this.editRoleform.name = row.name
      this.editRoleform.roleId = row.roleId
    },

    submitEditRole() {

    },
    deleteRoles(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        role.deleteRole({ roleId: row.roleId }).then(res => {
          this.getlist()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.sendList.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.sendList.page = val - 1
      this.getlist(this.sendList)
    },
    newRole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          role.addRole(this.newForm).then(res => {
            console.log(res)
            this.getlist()
          })
          this.$message.success('新增成功')
          this.dialogNewUserFormVisible = false
        } else {
          this.$message.error('请输入角色名')
          return false
        }
      })
      console.log(1)

      //   newItem(this.form).then(res => {
      //     console.log(res)
      //   })
    },
    search() {
      //   this.getlist(this.sendList)
    },
    getlist(data) {
      role.getRoles(data).then(res => {
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
