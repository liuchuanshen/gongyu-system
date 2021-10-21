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
    <el-table
      v-skeleton="{ loading: listLoading, rows: 10 }"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; overflow-y:hidden;"
    >
      <!-- <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->

      <el-table-column
        align="center"
        class-name="status-col"
        label="房号"
        width="110"
      >
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.houseId }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="门禁密码">
        <template slot-scope="scope">
          <span>{{ scope.row.doorPsw }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="门禁密码有效时间">
        <template slot-scope="scope">
          <span>{{ scope.row.doorPswTime }}分钟</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="房间密码">
        <template slot-scope="scope">
          <span>{{ scope.row.housePsw }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="房间密码有效时间">
        <template slot-scope="scope">
          <span>{{ scope.row.housePswTime }}分钟</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-refresh"
            @click="resetPass(scope.row)"
          >
            禁用
          </el-button>
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-refresh"
            @click="resetPass(scope.row)"
          >
            重置密码
          </el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit-outline"
            style="marginLeft:0px;marginTop:10px"
            @click="editPass(scope.row)"
          >
            修改密码
          </el-button>
        </template>
      </el-table-column>


    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {  temporaryList } from '@/api/data'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      dialogVisible: false,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 5,
        limit: 10
      },
      rows: {}
    }
  },
  created() {
    setTimeout(() => {
      this.getList()
    }, 2000)
  },
  methods: {
    resetPass(row) {
      this.$confirm('此操作将重置为默认密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '重置成功'
          })
          row.csmm = '123456'
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消重置'
          })
        })
    },
    editPass(row) {
      this.$prompt('请输入需要修改的 6 位纯数字密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d{6}$/,
        inputErrorMessage: '密码格式错误'
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '密码已更改为 :' + value
          })
          row.csmm = value
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消更改'
          })
        })
    },
    getList() {
      this.listLoading = true
      temporaryList().then(res => {
        this.list = res.data.data.result
        this.total = res.data.data.total
        this.listLoading = false
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
