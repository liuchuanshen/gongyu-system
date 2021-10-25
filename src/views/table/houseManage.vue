<template>
  <div class="app-container">

    <div class="detail">
      共<span class="num">{{total}}</span>
      间，出租率：<span class="num">{{rental}}</span>
    </div>

    <el-row :gutter="12">
      <el-col v-for="item in list" :key="item.id" :span="3">
        <el-card shadow="hover" class="box_outside_1" v-if="item.status==='入住'">
          <div class="box">
            <div>{{ item.fh }}</div>
            <div>南-23m²-¥3200</div>
            <div>到期日{{ item.zysj }}</div>
          </div>
          <div class="status_1">
            <div>{{ item.status }}</div>
          </div>
        </el-card >
         <el-card shadow="hover" class="box_outside_2" v-if="item.status==='闲置'">
          <div class="box">
            <div>{{ item.fh }}</div>
            <div>南-23m²-¥3200</div>
            <div>到期日{{ item.zysj }}</div>
          </div>
          <div class="status_2" >
            <div>{{ item.status }}</div>
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
  getuser, resources
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
      },
      list: [],
      total:'',
      rental:''
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
      resources(name).then(response => {
        this.list = response.data.data.result
        // this.temp.id = this.list.length + 1
        this.total = response.data.data.total

        let sum = 0
        this.list.forEach((item)=>{
          if(item.status==="入住"){
            sum++
          }
        })
        this.rental = (sum / this.total) * 100+"%"
        this.listLoading = false
      })
    }

  }
}
</script>
<style scoped>

.detail{
  margin: 10px;
}
.num{
  color: blue;
}

/deep/ .el-card{
  cursor: pointer ;
}

 /deep/ .el-card__body{
    padding: 0;
  }
  .box_outside_1{
    border-left:5px solid #58bc58;
    position: relative;
  }
  .box_outside_2{
    border-left:5px solid red;
    position: relative;
  }
 .box{
    font-size: 14px;
    padding: 10px;
  }
  .box div{
    height: 25px;
  }
  .status_1{
    border-bottom-left-radius:10px;
    position: absolute;
    top: 0;
    right: 0;
    background-color: #58bc58;
    font-size: 12px;
    padding: 10px;
    color: #fff;
  }
  .status_2{
    border-bottom-left-radius:10px;
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    font-size: 12px;
    padding: 10px;
    color: #fff;
  }



</style>
