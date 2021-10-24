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
        label="涉及房号"
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

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '0'" style="color:red">禁用</span>
          <span v-if="scope.row.status === '1'" style="color:#58bc58">启用</span>
          <span v-if="scope.row.status === '2'">到期</span>
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
            type="warning"
            size="mini"
            icon="el-icon-refresh"
            :disabled="scope.row.status === '1' ? false:true"
            @click="resetPass(scope.row)"
          >
            重置密码
          </el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit-outline"
            :disabled="scope.row.status === '1' ? false:true"
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
import { temporaryList, tempupdate } from '@/api/data'
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
      disable_status: false,
      enable_status: false,
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
    },
    disable(rows) {
      this.$confirm('此操作将禁用门禁密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        const data = { ...rows }
        data.status = '0'
        tempupdate(data).then(res => {
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
      this.$confirm('此操作将启用门禁密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        const data = { ...rows }
        data.status = '1'
        tempupdate(data).then(res => {
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
