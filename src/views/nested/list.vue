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
            {{ row.fh }}
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
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="150px" label="处理情况">
        <template slot-scope="scope">
          <span
            v-if="scope.row.status === 'wcl'"
            style="color: #58bc58;"
          >未处理</span>
          <span
            v-if="scope.row.status === 'clz'"
            style="color: red;"
          >处理中</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 'wcl'"
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="write(scope.row)"
          >
            派单
          </el-button>
          <!-- <el-button
            v-if="scope.row.jfqk === 'n'"
            type="danger"
            size="small"
            icon="el-icon-warning-outline"
            @click="write(scope.row)"
          >
            查看
          </el-button> -->
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

    <el-dialog
      title="派单申请"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="info">
        <div class="box">
          <span>房号：</span>
          <el-input v-model="form.fh" disabled />
        </div>
        <div class="box">
          <span>姓名：</span>
          <el-input v-model="form.name" disabled />
        </div>
        <div class="box">
          <span>事项：</span>
          <el-input v-model="form.msg" disabled />
        </div>
        <div class="box">
          <span>反馈时间：</span>
          <el-input v-model="form.time" disabled />
        </div>
        <div class="box">
          <span>处理情况：</span>
          <el-input v-model="form.status" disabled />
        </div>
        <div class="box">
          <span>派单意见：</span>
          <el-select v-model="value1" placeholder="请选择" clearable @change="selectChanged">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </div>
        <div class="box">
          <span>派单部门：</span>
          <el-select v-model="value2" placeholder="请选择" :disabled="choose===false?true:false" clearable @clear="setValueNull">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="sumbit()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
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
      value2: ''
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
      if (localStorage.getItem('todolist-success')) {
        this.list = JSON.parse(localStorage.getItem('todolist-success'))
        this.total = JSON.parse(localStorage.getItem('todolist-success')).length
      }
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
    selectChanged(value) {
      this.value1 = value
      this.choose = true
    },
    setValueNull(val) {
      this.choose = false
    },
    sumbit() {
      if (this.value1 === '') {
        this.$message.error('请补全派单意见')
        return false
      } else if (this.value2 === '') {
        this.$message.error('请补全派单部门')
        return false
      } else {
        const successData = JSON.parse(localStorage.getItem('todolist-success'))
        successData.forEach((item) => {
          if (item.id === this.form.id) {
            item.status = 'clz'
            item.pdyj = this.value1
            item.pdbm = this.value2
            localStorage.setItem('todolist-success', JSON.stringify(successData))
          }
        })
        this.$message.success('派单成功')
        this.dialogVisible = false
        this.getList()
      }
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
</style>
