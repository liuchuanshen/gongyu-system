<template>
  <div class="app-container">
    <el-table
      v-skeleton="{ loading: this.listLoading, rows: 10 }"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

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

      <el-table-column width="120px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="事项">
        <template slot-scope="scope">
          <span>{{ scope.row.msg }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="反馈时间">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="150px" label="处理情况">
        <template slot-scope="scope">
          <span
            v-if="scope.row.status === '1'"
            style="color: orange;"
          >处理中</span>
          <span
            v-if="scope.row.status === '2'"
            style="color: #58bc58;"
          >已处理</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === '1'"
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="look(scope.row)"
          >
            查看
          </el-button>
          <el-button
            v-if="scope.row.status === '1'"
            type="success"
            size="small"
            icon="el-icon-check"
            circle
            @click="sumbit(scope.row)"
          />
          <el-button
            v-if="scope.row.status === '2'"
            type="success"
            size="small"
            icon="el-icon-check"
            @click="look(scope.row)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    /> -->

    <el-dialog
      title="处理情况"
      :visible.sync="lookStatus"
      width="40%"
      :before-close="handleClose"
    >
      <div class="lookStatus">
        <el-steps :space="200" :active="activedata.length" finish-status="success">
          <el-step title="提交" />
          <el-step title="进行中" />
          <el-step title="已完成" />
        </el-steps>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lookStatus = false">取 消</el-button>
        <el-button
          type="primary"
          @click="lookStatus = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import {
  getTodolist, updateTodolist
} from '@/api/data'

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
      activedata: [],
      lookStatus: false,
      choose: false,
      form: {},
      dialogVisible: false,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      rows: {},
      options1: [{
        value: '1',
        label: '同意'
      }, {
        value: '2',
        label: '不同意'
      }],
      value1: '',
      options2: [{
        value: '1',
        label: '工程部'
      }, {
        value: '2',
        label: '行政部'
      }, {
        value: '3',
        label: '物业部'
      }, {
        value: '4',
        label: '保安部'
      }, {
        value: '5',
        label: 'IT部'
      }],
      value2: '',
      status: ''
    }
  },
  created() {
    setTimeout(() => {
      this.getList()
      this.loading = false
    }, 2000)
  },
  methods: {
    getList() {
      this.listLoading = true
      getTodolist(this.listQuery).then(res => {
        this.list = res.data.data.result
        // const process = res.data.data.result[0].process
        // const new_process = []
        // process.forEach((item) => {
        //   new_process.push(JSON.parse(item))
        // })
        // this.status = new_process[new_process.length - 1].statusStr

        // this.total = res.data.total
        this.listLoading = false
      })
      this.listLoading = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    write(rows) {
      this.form = { ...rows }
      this.dialogVisible = true
    },
    look(row) {
      this.activedata = row.process
      this.lookStatus = true
    },
    selectChanged(value) {
      this.value1 = value
      this.choose = true
    },
    setValueNull(val) {
      this.choose = false
    },
    // sumbit() {
    //   if (this.value1 === '') {
    //     this.$message.error('请补全派单意见')
    //     return false
    //   } else if (this.value2 === '') {
    //     this.$message.error('请补全派单部门')
    //     return false
    //   } else {
    //     const successData = JSON.parse(localStorage.getItem('todolist-success'))
    //     successData.forEach((item) => {
    //       if (item.id === this.form.id) {
    //         item.status = 'clz'
    //         item.pdyj = this.value1
    //         item.pdbm = this.value2
    //         localStorage.setItem('todolist-success', JSON.stringify(successData))
    //       }
    //     })
    //     this.$message.success('派单成功')
    //     this.dialogVisible = false
    //     this.getList()
    //   }
    // },
    sumbit(item) {
      console.log('item', item)
      this.$confirm('将该条数据转为已处理, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const myDate = new Date()
        item.status = '2'
        item.process.push({
          date: myDate.getFullYear() + '-' + myDate.getMonth() + '-' + myDate.getDate() + '\xa0' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds(),
          id: '3',
          status: '2',
          statusStr: '已处理'
        })
        updateTodolist({ 'id': item.id, 'process': item.process, 'status': item.status }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '处理成功！'
            })
            this.getList()
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
  flex-wrap: wrap;
  .box{
    display: flex;
    width: 50%;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    span{
      text-align: right;
      width: 100px;
    }
    .el-input{
      width: 200px;
    }
  }
}
.lookStatus{
  /* display: flex; */

}
</style>
