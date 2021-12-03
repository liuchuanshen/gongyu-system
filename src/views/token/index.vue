<!--
 * @Author: your name
 * @Date: 2021-10-14 10:35:23
 * @LastEditTime: 2021-10-15 15:34:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gongyu-system\src\views\passManage\index.vue
-->

<template>
  <div class="app-container">
     <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="Create()"
      >
        新增
      </el-button>
    <el-table
      v-skeleton="{ loading: listLoading, rows: 10 }"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; overflow-y:hidden;"
    >
      <el-table-column
        align="center"
        class-name="status-col"
        label="ID"
        width="110"
      >
        <template slot-scope="{ row }">
            {{ row.id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="密码">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="真实姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色">
         <template slot-scope="scope">
          <span v-if="scope.row.role === 'admin'">管理员</span>
          <span v-if="scope.row.role === 'editor'">游客</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '0'" style="color:red">禁用</span>
          <span v-if="scope.row.status === '1'" style="color:#58bc58">启用</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="500">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-refresh"
            :disabled="scope.row.status === '1' ? false:true"
            @click="disable(scope.row)"
          >
            禁用
          </el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-check"
            :disabled="scope.row.status === '0' ? false:true"
            @click="enable(scope.row)"
          >
            启用
          </el-button>
           <el-button
            type="danger"
            size="mini"
            icon="el-icon-refresh"
            @click="deleted(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


     <el-dialog title="新增" :visible.sync="dialogVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        :rules="loginRules"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="ID" prop="id">
          <el-input v-model="temp.id" disabled />
        </el-form-item>
        <el-form-item label="用户名" prop="rzsj">
            <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="密码" prop="rzsj">
            <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="xm">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="角色" prop="xb">
          <el-radio v-model="temp.role" label="admin">管理员</el-radio>
          <el-radio v-model="temp.role" label="editor">游客</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="createData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import {tokenCreate, tokenList, tokenupdate,tokenDelet } from '@/api/data'
// import Pagination from '@/components/Pagination' 

export default {
  name: 'Token',
  data() {
    return {
      dialogVisible: false,
      list: null,
      total: 0,
      listLoading: true,
      temp: {
        id: '',
        username: '',
        password: '',
        name: '',
        role: '',
        status:'1'
      },
    }
  },
  created() {
    setTimeout(() => {
      this.getList()
    }, 2000)
  },
  methods: {
    resetPass(rows) {
      this.$confirm('此操作将重置为默认密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = { ...rows }
          data.doorPsw = '123456'
          data.housePsw = '123456'
          data.status = '1'
          tempupdate(data).then(res => {
            if (res.data.code === 200) {
              this.getList()
              this.$message({
                type: 'success',
                message: '重置成功'
              })
            }
          })
        })
        .catch(() => {
        })
    },
    editPass(rows) {
      this.$prompt('请输入需要修改的 6 位纯数字密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d{6}$/,
        inputErrorMessage: '密码格式错误'
      })
        .then(({ value }) => {
          const data = { ...rows }
          data.doorPsw = value
          data.housePsw = value
          data.status = '1'
          tempupdate(data).then(res => {
            if (res.data.code === 200) {
              this.getList()
              this.$message({
                type: 'success',
                message: '密码已更改为 :' + value
              })
            }
          })
        })
        .catch(() => {
        })
    },
    getList() {
      this.listLoading = true
      tokenList().then(res => {
        this.list = res.data.data.result
        this.listLoading = false
        this.temp.id = res.data.data.result.length+1
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    write(rows) {
      this.rows = rows
      this.dialogVisible = true
    },
    disable(rows) {
      this.$confirm('此操作将禁用用户登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = { ...rows }
        data.status = '0'
        tokenupdate(data).then(res => {
          if (res.data.code === 200) {
            this.getList()
            this.$message({
              type: 'success',
              message: '禁用成功!'
            })
          }
        })
      }).catch(() => {
      })
    },
    enable(rows) {
      this.$confirm('此操作将允许用户登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = { ...rows }
        data.status = '1'
        tokenupdate(data).then(res => {
          if (res.data.code === 200) {
            this.getList()
            this.$message({
              type: 'success',
              message: '启用成功!'
            })
          }
        })
      }).catch(() => {
      })
    },
    Create(){
      this.dialogVisible=true
    },
    createData(){
       tokenCreate(this.temp).then((res) => {
            if (res.data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增用户成功',
                    type: 'success',
                    duration: 5000
                  })
                  this.getList()
                  this.dialogVisible = false
            }
          })
    },
    deleted(row){
       this.$confirm('此操作将删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tokenDelet({'id':row.id}).then(res => {
          if (res.data.code === 200) {
            this.getList()
            this.$message({
              type: 'success',
              message: '启用成功!'
            })
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.info {
  display: flex;
  .left {
    /* display: flex; */
    width: 80%;
    div {
      display: flex;
    }
  }
  .right {
    width: 20%;
    height: 100px;
    img {
      width: 100%;
      height: 100px;
    }
  }
  .el-table__body-wrapper {
    overflow: hidden;
  }
}
</style>
