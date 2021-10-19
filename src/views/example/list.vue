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
          <span>{{ scope.row.xm }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="入住时间">
        <template slot-scope="scope">
          <span>{{ scope.row.rzsj }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="租约时间">
        <template slot-scope="scope">
          <span>{{ scope.row.zysj }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="身份证号码">
        <template slot-scope="scope">
          <!-- <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" /> -->
          <span>{{ scope.row.sfzhm }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        class-name="status-col"
        label="手机号码"
        width="200"
      >
        <template slot-scope="scope">
          <!-- <el-tag :type="row.status | statusFilter"> -->
          <span>{{ scope.row.sjhm }}</span>
          <!-- </el-tag> -->
        </template>
      </el-table-column>

      <el-table-column align="center" width="150px" label="户型">
        <template slot-scope="scope">
          <!-- <router-link :to="'/example/edit/'+row.id" class="link-type"> -->
          <span>{{ scope.row.hx }}</span>
          <!-- </router-link> -->
        </template>
      </el-table-column>

      <el-table-column align="center" width="150px" label="缴费情况">
        <template slot-scope="scope">
          <span
            v-if="scope.row.jfqk === 'y'"
            style="color: #58bc58;"
          >缴费正常</span>
          <span
            v-if="scope.row.jfqk === 'n'"
            style="color: red;"
          >欠费状态</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="210" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.jfqk === 'y'"
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="write(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="scope.row.jfqk === 'n'"
            type="danger"
            size="small"
            icon="el-icon-warning-outline"
            @click="write(scope.row)"
          >
            查看
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

    <el-dialog
      title="租户信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="info">
        <div class="left">
          <div>
            <label
              style="lineHeight:35px;marginRight:52px;marginBottom:10px"
            >房号:</label>
            <el-input v-model="rows.fh" style="width:200px" />
          </div>
          <div>
            <label
              style="lineHeight:35px;marginRight:52px;marginBottom:10px"
            >姓名:</label>
            <el-input v-model="rows.xm" style="width:200px" />
          </div>
          <div>
            <label
              style="lineHeight:35px;marginRight:24px;marginBottom:10px"
            >入住时间:</label>
            <el-date-picker
              v-model="rows.rzsj"
              type="date"
              placeholder="选择日期"
              style="width:200px"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </div>
          <div>
            <label
              style="lineHeight:35px;marginRight:24px;marginBottom:10px"
            >租约时间:</label>
            <el-date-picker
              v-model="rows.zysj"
              type="date"
              placeholder="选择日期"
              style="width:200px;"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </div>
          <div>
            <label
              style="lineHeight:35px;marginRight:10px;marginBottom:10px"
            >身份证号码:</label>
            <el-input v-model="rows.sfzhm" style="width:200px" />
          </div>
          <div>
            <label
              style="lineHeight:35px;marginRight:24px;marginBottom:10px"
            >手机号码:</label>
            <el-input v-model="rows.sjhm" style="width:200px" />
          </div>
          <div>
            <label
              style="lineHeight:35px;marginRight:52px;marginBottom:10px"
            >户型:</label>
            <el-select v-model="rows.hx" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <!-- <el-input v-model="rows.hx" style="width:200px"></el-input> -->
          </div>
          <div>
            <label
              style="lineHeight:35px;marginRight:32px;marginBottom:10px"
            >缴费情况:</label>
            <div
              v-if="rows.jfqk === 'y'"
              style="color: #58bc58;lineHeight:35px"
            >
              缴费正常
            </div>
            <div v-if="rows.jfqk === 'n'" style="color: red;lineHeight:35px">
              欠费状态
            </div>
          </div>
        </div>
        <div class="right">
          <img
            src="https://img0.baidu.com/it/u=1565151598,3258818133&fm=26&fmt=auto&gp=0.jpg"
            alt=""
          >
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
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
        page: 1,
        limit: 10
      },
      rows: {},
      options: [
        {
          value: '单间',
          label: '单间'
        },
        {
          value: '一房一厅',
          label: '一房一厅'
        },
        {
          value: '两房一厅',
          label: '两房一厅'
        },
        {
          value: '三房一厅',
          label: '三房一厅'
        },
        {
          value: '三房两厅',
          label: '三房两厅'
        }
      ],
      value: ''
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
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
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
}
</style>
