<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column
      v-loading="loading"
      align="center"
      label="ID"
      width="65"
      element-loading-text="请给我点时间！"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label=" 房号">
      <template slot-scope="scope">
        <span>{{ scope.row.fh }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="上月费用">
      <template slot-scope="scope">
        <span>{{ scope.row.sysf || scope.row.sydf || scope.row.sywf }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="上月度数">
      <template slot-scope="scope">
        <span>{{ scope.row.syds }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="今月费用">
      <template slot-scope="scope">
        <span>{{ scope.row.jysf ||scope.row.jydf||scope.row.jywf }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="今月度数">
      <template slot-scope="scope">
        <span>{{ scope.row.jyds }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="操作">
      <template slot-scope="scope">

        <el-button v-if="scope.row.status==='y'" type="success" plain @click="pay(scope)">发送账单</el-button>
        <el-button v-if="scope.row.status==='n'" type="danger" plain>已发送账单</el-button>
      </template>
    </el-table-column>

    <!-- <el-table-column width="110px" align="center" label="Author">
      <template slot-scope="scope">
        <span>{{ scope.row.author }}</span>
      </template>
    </el-table-column>

    <el-table-column width="120px" label="Importance">
      <template slot-scope="scope">
        <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" />
      </template>
    </el-table-column>

    <el-table-column align="center" label="Readings" width="95">
      <template slot-scope="scope">
        <span>{{ scope.row.pageviews }}</span>
      </template>
    </el-table-column> -->

    <!-- <el-table-column class-name="status-col" label="缴费状态" width="110">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
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
  props: {
    type: {
      type: String,
      default: 'SF'
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 10,
        type: this.type
        // sort: '+id'
      },
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.loading = false
      })
    },
    pay() {
      this.$confirm('是否确认提交账单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '发送成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

