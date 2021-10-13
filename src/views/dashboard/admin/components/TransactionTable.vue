<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="应收款明细" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.msg }}
      </template>
    </el-table-column>
    <el-table-column label="收款金额" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price }}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="{row}">
        <!-- <el-tag :type="row.status"> -->
        <span v-if="row.status==='y'" style="color: #58bc58;">已缴费</span>
        <span v-if="row.status==='n'" style="color: red;">未缴清</span>
        <!-- {{ row.status==='y'?'已缴费':'未缴清' }} -->
        <!-- </el-tag> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items
      })
    }
  }
}
</script>
