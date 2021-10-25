<template>
  <div class="app-container">

    <div>
      <FilenameOption v-model="filename" />
      <!-- <AutoWidthOption v-model="autoWidth" /> -->
      <BookTypeOption v-model="bookType" />
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        导出Excel
      </el-button>
      <!-- <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
        <el-tag type="info">Documentation</el-tag>
      </a> -->
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.xm }}
        </template>
      </el-table-column>
      <el-table-column label="性别"  align="center">
        <template slot-scope="scope">
          {{ scope.row.xb }}
        </template>
      </el-table-column>
      <el-table-column label="身份证号码" align="center">
        <template slot-scope="scope">
          {{ scope.row.sfzhm }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号码" >
         <template slot-scope="scope">
          {{ scope.row.sjhm }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="状态" >
          <template slot-scope="{ row }">
          <el-tag v-if="row.status === '已退房'" style="color:red">{{ row.status }}</el-tag>
          <el-tag v-if="row.status === '入住'">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getuser } from '@/api/data'
import { parseTime } from '@/utils'
// options components
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'

export default {
  name: 'ExportExcel',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      list: null,
      listLoading: false,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // fetchData() {
    //   this.listLoading = true
    //   fetchList().then(response => {
    //     this.list = response.data.items
    //     this.listLoading = false
    //   })
    // },
    getList(name) {
      this.listLoading = true
      getuser(name).then(response => {
        this.list = response.data.data.result
        this.listLoading = false
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', '姓名', '性别', '身份证号码', '手机号码','状态']
        const filterVal = ['id', 'xm', 'xb', 'sfzhm', 'sjhm','status']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
