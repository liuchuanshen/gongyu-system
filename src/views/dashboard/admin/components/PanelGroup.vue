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
            <count-to :start-val="0" :end-val="userNumber" :duration="2600" class="card-panel-num" />
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
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('watch')">
          <div class="card-panel-description-other">
            <div class="card-panel-text">
              租客看房
            </div>
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

    <el-dialog title="租客看房" :visible.sync="watch">
      <el-form :model="form">
        <el-form-item label="门禁密码" :label-width="formLabelWidth">
          <el-input v-model="form.doorPsw" autocomplete="off" style="width:200px" />
        </el-form-item>
        <el-form-item label="门禁密码有效时间" :label-width="formLabelWidth">
          <div class="block">
            <el-slider
              v-model="form.doorPswTime"
              show-input
            />
          </div>
        </el-form-item>
        <el-form-item label="房号" :label-width="formLabelWidth">
          <el-select v-model="form.houseId" placeholder="请选择活动区域">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="房间密码" :label-width="formLabelWidth">
          <el-input v-model="form.housePsw" autocomplete="off" style="width:200px" />
        </el-form-item>
        <el-form-item label="密码有效时间" :label-width="formLabelWidth">
          <div class="block">
            <el-slider
              v-model="form.housePswTime"
              show-input
            />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="watch = false">取 消</el-button>
        <el-button type="primary" @click="sumbit()">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import CountTo from 'vue-count-to'
import { fetchSuccessMsg } from '@/api/article'
import { getlist, getuser, temporary } from '@/api/data'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      time: '',
      formLabelWidth: '150px',
      form: {
        doorPsw: '',
        doorPswTime: null,
        houseId: '',
        housePsw: '',
        housePswTime: null,
        status:'1'
      },
      options: [{
        value: '101',
        label: '101'
      }, {
        value: '102',
        label: '102'
      }, {
        value: '103',
        label: '103'
      }, {
        value: '104',
        label: '104'
      }, {
        value: '105',
        label: '105'
      }],
      activeName: '1',
      drawer: null,
      watch: null,
      todolist: [],
      MessageBox: null,
      userNumber: null
    }
  },
  created() {
    this.UserList()
  },
  mounted() {
    this.$bus.$on('MessageBox', (data) => {
      this.MessageBox = data.total
      this.todolist = data.result
    })
  },
  methods: {
    UserList() {
      getuser().then((response) => {
        this.userNumber = response.data.data.total
      })
    },
    handleSetLineChartData(type) {
      if (type === 'messages') {
        this.drawer = true
      } else if (type === 'watch') {
        this.watch = true
      }
    },
    update(item) {
      
      console.log('item',item)

      this.$confirm('将该条数据转入待办事项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const query = { 'id': item.id }
        // fetchSuccessMsg(query).then(response => {
        //   if (response.code === 20000) {
        //     this.drawer = true
        //     this.todolist = data.list
        //     this.$message({
        //       type: 'success',
        //       message: '添加到待办事项成功！'
        //     })
        //   }
        // })
      }).catch(() => {
      })
    },
    sumbit() {
      temporary(this.form).then((res) => {
        if (res.data.code === 200) {
          this.watch = false
          this.$message.success('设置临时门禁密码成功')
        }
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

    .card-panel-description-other{
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 32px;
        margin-bottom: 12px;
      }
    }

   .card-panel-description-other:hover{
     background-color: #36a3f7;
      .card-panel-text {
        color: #fff;
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
