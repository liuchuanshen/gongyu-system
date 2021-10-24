<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="请输入租客姓名"
        style="width: 200px;margin-right: 20px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新增
      </el-button>
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button> -->
    </div>

    <el-table
      :key="tableKey"
      v-skeleton="{ loading: listLoading, rows: 10 }"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.fh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入住时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.rzsj }}</span>
        </template>
      </el-table-column>
      <el-table-column label="租约时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.zysj }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{ row.xm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.xb }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号码" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.sfzhm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.sjhm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="户型" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.hx }}</span>
        </template>
      </el-table-column>
      <el-table-column label="缴费情况" class-name="status-col">
        <template slot-scope="{ row }">
          <el-tag v-if="row.jfqk === 'y'">
            缴费正常
          </el-tag>
          <el-tag v-if="row.jfqk === 'n'" type="danger">
            缴费异常
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col">
        <template slot-scope="{ row }">
          <el-tag type="success">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            style="marginRight:20px"
            @click="handleUpdate(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            title="确认退房吗？"
            @onConfirm="handleDelete(row, $index)"
          >
            <el-button
              v-if="row.status != 'deleted'"
              slot="reference"
              size="mini"
              type="danger"
            >退房</el-button>
          </el-popconfirm>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="ID" prop="id">
          <el-input v-model="temp.id" disabled />
        </el-form-item>
        <el-form-item label="入住时间" prop="rzsj">
          <el-date-picker
            v-model="temp.rzsj"
            type="datetime"
            value-format="yyyy-MM-dd"
            placeholder="请选择入住时间"
          />
        </el-form-item>
        <el-form-item label="租约时间" prop="zysj">
          <el-date-picker
            v-model="temp.zysj"
            type="datetime"
            value-format="yyyy-MM-dd"
            placeholder="请选择租约时间"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="xm">
          <el-input v-model="temp.xm" />
        </el-form-item>
        <el-form-item label="性别" prop="xm">
          <el-radio v-model="temp.xb" label="男">男</el-radio>
          <el-radio v-model="temp.xb" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="身份证号码" prop="sfzhm">
          <el-input v-model="temp.sfzhm" />
        </el-form-item>
        <el-form-item label="手机号码" prop="sjhm">
          <el-input v-model="temp.sjhm" />
        </el-form-item>
        <el-form-item label="户型" prop="hx" style="marginRight:20px">
          <el-radio v-model="temp.hx" label="单间">单间</el-radio>
        </el-form-item>
        <el-form-item label="房号" prop="fh" style="marginRight:20px">
          <el-select v-model="temp.fh" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="押金缴费情况" prop="jfqk" style="marginRight:20px">
          <el-radio v-model="temp.jfqk" label="y">已交</el-radio>
          <el-radio v-model="temp.jfqk" label="n">未交</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogPvVisible = false"
        >Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getuser, createUser
} from '@/api/data'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

export default {
  name: 'Create',
  components: { Pagination },
  directives: { waves },
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'info',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   },
  //   typeFilter(type) {
  //     return calendarTypeKeyValue[type]
  //   }
  // },
  data() {
    return {
      options: [
        {
          value: '101',
          label: '101'
        },
        {
          value: '102',
          label: '102'
        },
        {
          value: '201',
          label: '201'
        },
        {
          value: '202',
          label: '202'
        }
      ],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: '',
        fh: '',
        rzsj: '',
        zysj: '',
        xm: '',
        xb: '',
        sfzhm: '',
        sjhm: '',
        hx: '',
        jfqk: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    setTimeout(() => {
      this.getList()
    }, 2000)
  },
  methods: {
    getList(name) {
      this.listLoading = true

      if (name === '' || name === undefined) {
        name = {}
      } else {
        name = { 'name': name }
      }
      console.log('name', name)
      getuser(name).then(response => {
        this.list = response.data.data.result
        this.temp.id = this.list.length + 1
        this.total = response.data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList(this.listQuery.name)
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: this.temp.id,
        fh: '',
        rzsj: '',
        zysj: '',
        xm: '',
        sfzhm: '',
        sjhm: '',
        hx: '',
        jfqk: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = this.total + 1
          createUser(this.temp).then((res) => {
            if (res.data.code === 200) {
              this.getList()
              // this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '新增租户成功',
                type: 'success',
                duration: 5000
              })
            }
          })

          // createArticle(this.temp).then(() => {
          //   this.list.unshift(this.temp)
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: 'Success',
          //     message: 'Created Successfully',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '提示',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      console.log(666)
      this.$notify({
        title: '提示',
        message: '退房成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '房号', '入住时间', '租约时间', '姓名', '性别', '身份证号码', '手机号码', '户型', '缴费情况', '状态']
        const filterVal = ['ID', '房号', '入住时间', '租约时间', '姓名', '性别', '身份证号码', '手机号码', '户型', '缴费情况', '状态']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === 'ID') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style scoped></style>
