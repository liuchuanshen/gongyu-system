<template>
  <div class="app-container">

    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="box">
              <div>1</div>
              <div>2</div>
              <div>3</div>
          </div>
        </el-card>
      </el-col>
    </el-row>




    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
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
        <el-form-item label="身份证号码" prop="sfzhm">
          <el-input v-model="temp.sfzhm" />
        </el-form-item>
        <el-form-item label="手机号码" prop="sjhm">
          <el-input v-model="temp.sjhm" />
        </el-form-item>
        <el-form-item label="户型" prop="hx" style="marginRight:20px">
          <el-radio v-model="temp.hx" label="一房一厅">一房一厅</el-radio>
          <el-radio v-model="temp.hx" label="两房一厅">两房一厅</el-radio>
        </el-form-item>
        <el-form-item label="房号" prop="fh" style="marginRight:20px">
          <el-radio v-model="temp.fh" label="一房一厅">一房一厅</el-radio>
          <el-radio v-model="temp.fh" label="两房一厅">两房一厅</el-radio>
        </el-form-item>
        <el-form-item label="缴费情况" prop="jfqk" style="marginRight:20px">
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

  </div>
</template>

<script>
import {
  getuser, createUser
} from '@/api/data'

export default {
  name: 'Create',
  data() {
    return {
      dialogFormVisible: false,
      temp: {
        id: '',
        fh: '',
        rzsj: '',
        zysj: '',
        xm: '',
        sfzhm: '',
        sjhm: '',
        hx: '',
        jfqk: ''
      }
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
    }

  }
}
</script>
<style scoped>

/deep/ .el-card{
  border-left:5px solid #58bc58;
  cursor: pointer ;
}

 /deep/ .el-card__body{
    padding: 0;
  }

 .box{
      padding: 5px;
  }
  
</style>
