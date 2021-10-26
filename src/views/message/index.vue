<template>
  <el-container
    
    style="height:100%;"
  >
    <el-main style="height:100%;paddingTop:5%">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-chat-line-square" style="margin-right:5px"></i>
          <span>留言箱</span>
        </div>
        <!-- <div
          style="width:100%;height:150px;overflow:auto;border:1px solid #ccc;paddingRight:20px"
        >
          <li v-for="o in 10" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </li>
        </div> -->

        <!-- <hr style="margin:20px 20px" /> -->

        <div>
          <el-label style="marginRight:50px">
            房号：
          </el-label>
          <el-input
            placeholder="请输入房号"
            v-model="form.houseId"
            size="medium"
            clearable
            style="width:30%;marginBottom:20px"
          />
        </div>

        <div>
          <el-label style="marginRight:50px">
            姓名：
          </el-label>
          <el-input
            placeholder="请输入姓名"
            v-model="form.name"
            size="medium"
            clearable
            style="width:30%;marginBottom:20px"
          />
        </div>

        <div>
          <el-label>
            意见或建议：
          </el-label>
          <el-input
            type="text"
            maxlength="50"
            show-word-limit
            size="medium"
            placeholder="请输入内容"
            v-model="form.msg"
            style="width:70%;marginBottom:20px"
          />
        </div>

        <div class="btn">
          <el-button type="primary" icon="el-icon-edit-outline" @click="submit"
            >提交</el-button
          >
          <el-button type="warning" icon="el-icon-delete" @click="clear"
            >清空</el-button
          >
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { setMessage } from '@/api/data'

export default {
  data() {
    return {
      isFullscreen: false,
      form:{
        houseId:'',
        name:'',
        msg:''
      }
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    submit(){
      setMessage().then((res)=>{
        if(res.data.code===200){
          this.$message.success('提交成功')
        }
      })
    },
    clear(){
      this.form={
        houseId:'',
        name:'',
        msg:''
      }
    }
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 30%;
  height: 350px;
  margin: auto auto;
  border-radius: 20px;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
hr {
  height: 0px;
  border-top: 1px solid #ccc;
  border-right: 0px;
  border-bottom: 0px;
  border-left: 0px;
}
li {
  list-style: none;
}
</style>
