/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <div class="menu">
    <div class="newMenu">
      <el-button type="success" size="mini" style="margin-bottom:15px" @click="newMenu(1)">新增菜单</el-button>
      <el-dialog title="菜单" :visible.sync="dialogNewMenuFormVisible" width="450px">
        <el-form ref="newMenuInfo" :model="menuForm" :rules="rules">
          <el-form-item label="菜单名" :label-width="'80px'" prop="name">
            <el-input v-model="menuForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="连接地址" :label-width="'80px'" prop="url">
            <el-input v-model="menuForm.url" autocomplete="off" />
          </el-form-item>
          <el-form-item label="请求类型" :label-width="'80px'" prop="method">
            <el-select v-model="menuForm.method" placeholder="请选择活动区域">
              <el-option v-for="(item,index) in method" :key="index" :label="item.value" :value="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item v-if="menuForm.method" label="关键字" :label-width="'80px'" prop="alias">
            <el-input v-model="menuForm.alias" autocomplete="off" />
          </el-form-item>
          <el-form-item label="ico小图标" :label-width="'80px'">
            <el-input v-model="menuForm.ico" autocomplete="off" />
          </el-form-item>
          <el-form-item label="排序" :label-width="'80px'">
            <el-input v-model="menuForm.sort" autocomplete="off" />
          </el-form-item>
          <el-form-item label="" :label-width="'55px'">
            <el-switch v-model="menuForm.funType" active-text="按钮" inactive-text="菜单" :disabled="isButton" />
          </el-form-item>
          <el-form-item label="">
            <el-switch v-model="menuForm.show" active-text="菜单列表显示" inactive-text="菜单列表隐藏" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogNewMenuFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editMenu('newMenuInfo')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="menuList">
      <el-collapse v-for="(item,index) in list" :key="index" style="position:relative">
        <div class="ico">
          <i class="el-icon-plus cou" @click="newMenu(item)" />
          <i class="el-icon-edit cou" @click="editMenuItem(item)" />
          <i class="el-icon-close cou" @click="deleteMenu(item)" />
        </div>
        <el-collapse-item :title="item.name">
          <div class="menuItem">
            <el-tag
              v-for="(tag,index) in item.funs"
              v-if="tag.funType===2"
              :key="index"
              closable
              type="success"
              @close="deleteMenu(tag)"
            >
              {{ tag.name }}
              <i class="el-icon-edit cou" @click="editMenuItem(tag)" />
            </el-tag>
          </div>
          <el-collapse v-for="(item1,index1) in item.funs" v-if="item1.funType!==2" :key="index1" style="position:relative">
            <div class="ico" style="top:12px;right:40px">
              <i class="el-icon-plus cou" @click="newMenu(item1)" />
              <i class="el-icon-edit cou" @click="editMenuItem(item1)" />
              <i class="el-icon-close cou" @click="deleteMenu(item1)" />
            </div>
            <el-collapse-item :title="item1.name" style="padding:0 15px">
              <div class="menuItem">
                <el-tag
                  v-for="tag in item1.funs"
                  v-if="tag.funType===2"
                  :key="tag.funId"
                  closable
                  type="success"
                  @close="deleteMenu(tag)"
                >
                  {{ tag.name }}
                  <i class="el-icon-edit cou" @click="editMenuItem(tag)" />
                </el-tag>
              </div>
              <el-collapse v-for="(item2,index2) in item1.funs" v-if="item2.funType!==2" :key="index2" style="position:relative">
                <div class="ico" style="top:12px;right:40px">
                  <i class="el-icon-plus cou" @click="newMenu(item2)" />
                  <i class="el-icon-edit cou" @click="editMenuItem(item2)" />
                  <i class="el-icon-close cou" @click="deleteMenu(item2)" />
                </div>
                <el-collapse-item :title="item2.name" style="padding:0 15px">
                  <div class="menuItem">
                    <el-tag
                      v-for="tag in item2.funs"
                      v-if="tag.funType===2"
                      :key="tag.funId"
                      closable
                      type="success"
                      @close="deleteMenu(tag)"
                    >
                      {{ tag.name }}
                      <i class="el-icon-edit cou" @click="editMenuItem(tag)" />
                    </el-tag>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-collapse-item>

          </el-collapse>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import * as menu from '@/api/menu'
export default {
  data() {
    return {
      list: [
        { value: '用户', key: 1 },
        { value: '任务', key: 2 },
        { value: '活动', key: 3 },
        { value: '优惠券', key: 4 }
      ],
      method: [
        { value: null },
        { value: 'GET' },
        { value: 'POST' },
        { value: 'PUT' },
        { value: 'DELETE' }
      ],
      activeName: 1,
      dialogNewMenuFormVisible: false,
      menuForm: {
        name: null,
        url: null,
        method: null,
        ico: null,
        sort: null,
        funType: null,
        show: false,
        alias: ''

      },
      menuFormCopy: null,
      rules: {
        name: [{ required: true, message: '请输入菜单名', trigger: 'blur' }],
        url: [{ required: true, message: '请输入路径', trigger: 'blur' }],
        method: [{ required: true, message: '请输入请求类型', trigger: 'change' }]
        // alias: [{ required: true, message: '请输入字段', trigger: 'blur' }]
      },
      isNew: null,
      isButton: false

    }
  },
  mounted() {
    this.menuFormCopy = { ...this.menuForm }
    this.getMenu()
  },
  methods: {
    editMenu(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let menuForm = { ...this.menuForm }
          menuForm.funType = menuForm.funType ? 2 : 1
          menuForm.show = menuForm.show ? 1 : 2
          delete menuForm.funs
          //
          console.log(menuForm)
          // return
          if (!this.isNew) {
            menu.editMenu(menuForm).then(res => {
              console.log(res)
              this.$message.success('操作成功')
              this.dialogNewMenuFormVisible = false
              this.getMenu()
            })
          } else {
            menu.newMenu(menuForm).then(res => {
              console.log(res)
              this.$message.success('操作成功')
              this.dialogNewMenuFormVisible = false
              this.getMenu()
            })
          }
        } else {
          this.$message.error('请完善信息')
          return false
        }
      })
    },
    getMenu() {
      menu.getMenuList().then(res => {
        this.list = res.data
      })
    },
    editMenuItem(val) { // 点击编辑标签按钮
      // this.isButton = true

      console.log(val)
      this.dialogNewMenuFormVisible = true
      this.menuForm = { ...val }
      this.menuForm.funType = val.funType === 2
      this.menuForm.show = val.show === 1
    },
    newMenu(val) {
      this.isButton = false

      if (val === 1) {
        this.menuForm = { ...this.menuFormCopy }
      } else {
        this.menuForm = { ...this.menuFormCopy }
        this.menuForm.parentId = val.funId
        if (val.funs.length > 0) {
          if (val.funs[0].funType === 2) {
            this.menuForm.funType = true
          }
        }
      }
      this.dialogNewMenuFormVisible = true
      this.isNew = true
    },
    deleteMenu(val) {
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!val.funs.length > 0) {
          menu.delMenu({ id: val.funId }).then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getMenu()
          })
        } else {
          this.$message.error('请先删除内部菜单')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu{
    padding:15px;
  }
  .ico{
    position: absolute;
    right: 25px;
    top: 15px;
  }
  .menuItem{
    display:flex;
    justify-content: space-around;
  }
  .cou{
    cursor:pointer;
    &:hover{
      color: #0094ff
    }
  }
</style>
