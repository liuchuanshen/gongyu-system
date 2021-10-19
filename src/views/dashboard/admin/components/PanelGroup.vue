<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              当前租户
            </div>
            <count-to :start-val="0" :end-val="123" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              留言箱
            </div>
            <count-to :start-val="0" :end-val="MessageBox" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              已收费用
            </div>
            <count-to :start-val="0" :end-val="123" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              未收费用
            </div>
            <count-to :start-val="0" :end-val="123" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>

    <el-drawer
      title="留言箱"
      :visible.sync="drawer"
      direction="rtl"
    >
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item,idx) in todolist" :key="item.id" :title="item.name" :name="idx">
          <div class="msg">
            <div>{{ item.msg }}</div>
            <div>{{ item.time }}</div>
            <el-link type="primary" @click="update(item)">
              添加到待办事项
            </el-link>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-drawer>
  </div>

</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      activeName: '1',
      drawer: null,
      todolist: [],
      MessageBox: JSON.parse(localStorage.getItem('todolist')).length
    }
  },
  mounted() {
    this.$bus.$on('MessageBox', () => {
      this.MessageBox = JSON.parse(localStorage.getItem('todolist')).length
    })
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)

      if (type === 'messages') {
        this.msg = [
          { id: '1', msg: '房东我的水管爆了', name: '刘XX ', time: '2021-7-1', fh: '101', status: 'wcl' },
          { id: '2', msg: '房东我的水管爆了', name: '刘XX', time: '2021-7-1', fh: '102', status: 'wcl' },
          { id: '3', msg: '房东我的水管爆了', name: '刘XX', time: '2021-7-1', fh: '201', status: 'wcl' },
          { id: '4', msg: '房东我的水管爆了', name: '刘XX', time: '2021-7-1', fh: '202', status: 'wcl' },
          { id: '5', msg: '房东我的水管爆了', name: '刘XX', time: '2021-7-1', fh: '301', status: 'wcl' },
          { id: '6', msg: '房东我的水管爆了', name: '刘XX', time: '2021-7-1', fh: '302', status: 'wcl' }
        ]
        if (localStorage.getItem('todolist')) {
          this.todolist = JSON.parse(localStorage.getItem('todolist'))
          this.drawer = true
        } else {
          localStorage.setItem('todolist', JSON.stringify(this.msg))
          this.todolist = JSON.parse(localStorage.getItem('todolist'))
          this.drawer = true
        }
      }
    },
    update(item) {
      this.$confirm('将该条数据转入待办事项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.data = []
        const res = this.todolist.filter((res) => {
          if (item.id !== res.id) {
            return res
          } else if (item.id === res.id) {
            this.data.push(item)
          }
        })

        localStorage.setItem('todolist', JSON.stringify(res))

        if (localStorage.getItem('todolist-success')) {
          const successData = JSON.parse(localStorage.getItem('todolist-success'))
          successData.push(this.data[0])
          localStorage.setItem('todolist-success', JSON.stringify(successData))
        } else {
          localStorage.setItem('todolist-success', JSON.stringify(this.data))
        }

        this.$message({
          type: 'success',
          message: '添加到待办事项成功！'
        })
        this.todolist = JSON.parse(localStorage.getItem('todolist'))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消添加'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

::v-deep  .el-drawer{
      background-color:#304156;
    }
::v-deep  .el-drawer__header{
      color: #fff;
    }
    ::v-deep .el-collapse-item__header{
      color: #fff;
      background-color:#304156;
}
::v-deep .el-collapse-item__wrap{
      background-color:#304156;
}
::v-deep .el-collapse-item__content{
  color: #fff;
}
.msg{
  padding: 5px;
  display: flex;
  justify-content: space-between;
}
::v-deep .el-collapse{
  height: 800px;
  overflow-y: scroll;
}

</style>
