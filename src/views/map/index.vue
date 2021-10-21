<template>
  <div class="container">
    <div class="con-map">
      <div id="container">
      <!-- <div class="filter">图层过滤</div>
          <div class="province">广东省</div> -->
      </div>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <div
        style=" width:100%;
      height:100%;"
      >
        <img
          src="https://www.bieshugc.com/storage/topic/20210818/e7e85ee1832870a6a20126c41baf41e2_water.jpg.webp?v=1629267074131"
          alt=""
          style=" width:100%;
        height:100%;"
        >
      </div>
      <p>房屋类型：{{ houseType }}</p>
      <p>朝向楼层：{{ floor }} </p>
      <p>所在小区： {{ kkmc }}</p>
      <p>在住人口： {{ people }} 人</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="monitor">实时监控</el-button>
        <el-button type="success" @click="watch">设备情况</el-button>
        <el-button type="danger" @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 视频监控信息 -->
    <el-drawer
      :title="title"
      :visible.sync="drawer"
      direction="ttb"
    >
      <div class="video">
        <div>
          <video src="./1.mp4" controls="controls" autoplay loop height="230px" />
        </div>
        <div>
          <video src="./1.mp4" controls="controls" autoplay loop height="230px" />
        </div>
        <div>
          <video src="./1.mp4" controls="controls" autoplay loop height="230px" />
        </div>
        <div>
          <video src="./1.mp4" controls="controls" autoplay loop height="230px" />
        </div>
      </div>
      <div id="myChart" :style="{width: '300px', height: '300px'}" />
    </el-drawer>

    <!-- 设备监控信息 -->
    <el-drawer
      title="设备监控"
      :visible.sync="watchStatus"
      direction="ttb"
    >
      <div style="display:flex">
        <div id="myChart1" :style="{width: '320px', height: '320px',marginLeft:'100px'}" />
        <div id="myChart2" :style="{width: '320px', height: '320px',marginLeft:'100px'}" />
        <div id="myChart3" :style="{width: '320px', height: '320px',marginLeft:'100px'}" />
        <div id="myChart4" :style="{width: '320px', height: '320px',marginLeft:'100px'}" />
      </div>
    </el-drawer>

  </div>
</template>

<script>
import { color } from 'echarts/lib/export'
export default {
  name: '',
  data() {
    return {
      watchStatus: false,
      drawer: false,
      people: null,
      houseType: null,
      floor: null,
      kkmc: null,
      src: null,
      title: null,
      centerDialogVisible: false,
      arr: [],
      map: null,
      infoBox: null,
      mapData: [
        { kkjd: 113.241246, kkwd: 23.431839, kkmc: '融创', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.232191, kkwd: 23.434293, kkmc: '雪域华府', houseType: '2室2厅1卫  75 平  精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.233844, kkwd: 23.411479, kkmc: '骏壹万邦', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.225256, kkwd: 23.395128, kkmc: '花果山', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.243043, kkwd: 23.396654, kkmc: '锦尚蓬莱' },
        { kkjd: 113.215626, kkwd: 23.403287, kkmc: '茶园雅居', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.208512, kkwd: 23.401728, kkmc: '松园居', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.221375, kkwd: 23.412175, kkmc: '公益别墅', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.203697, kkwd: 23.394664, kkmc: '元华新村', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.232838, kkwd: 23.4072, kkmc: '亚美大厦', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.208512, kkwd: 23.4072, kkmc: '新景豪苑', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.228322, kkwd: 23.5072, kkmc: '公寓11', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.228212, kkwd: 23.4072, kkmc: '钻石花园', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.248312, kkwd: 23.4072, kkmc: '天幕城', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' },
        { kkjd: 113.228312, kkwd: 23.4072, kkmc: '钻石花园', houseType: '8层自建房（含电梯）精装修', floor: ' 南  中层 / 30层', people: '210' }

      ],
      jd1: '',
      wd1: '',
      jd2: '',
      wd2: '',
      container: null,
      startPoint: '',
      currentPoint: '',
      boxContainer: '',
      pointsArr: [],
      num: 0,
      type: null
    }
  },
  created() {
  },
  mounted() {
    this.showMap()
  },
  methods: {
    /**
        * 地图展示
        */
    showMap() {
      this.map = new BMap.Map('container')// 对应地图容器id
      const centerPoint = new BMap.Point(113.227017, 23.409688)
      this.map.centerAndZoom(centerPoint, 15)
      this.map.enableScrollWheelZoom(true)
      this.map.enableDoubleClickZoom(true)
      this.markerPoint()
    },
    /**
        * 添加地图marker
      */
    markerPoint() {
      this.map.clearOverlays()

      this.mapData.forEach((item, idx) => {
        const point = new BMap.Point(item.kkjd, item.kkwd) // 将标注点转化成地图上的点
        const marker = new BMap.Marker(point) // 将点转化成标注点
        this.map.addOverlay(marker)
        marker.addEventListener('mouseover', () => {
          this.markerPointMouseover({ 'line': point, 'item': item })
        })
        marker.addEventListener('mouseout', () => {
          this.map.closeInfoWindow()
        })

        marker.addEventListener('click', (event) => {
          console.log(123, item)
          this.people = item.people
          this.houseType = item.houseType
          this.floor = item.floor
          this.kkmc = item.kkmc
          this.title = item.kkmc
          this.centerDialogVisible = true
        })
      })
    },
    /**
       * 移入marker弹出信息框
      */
    markerPointMouseover(data) {
      const { line, item } = data
      const html = `<div style="background: #E3F2FD; padding: 10px;font-size: 14px; color: #333333">${item.kkmc}</div>`
      const opts = {
        // boxStyle: {
        width: 210, // 信息窗口宽度
        height: 0, // 信息窗口高度
        enableMessage: true, // 设置允许信息窗发送短息
        message: ''
      }
      const infoWindow = new BMap.InfoWindow(html, opts)
      const point = new BMap.Point(line.lng, line.lat)
      this.map.openInfoWindow(infoWindow, point)
    },
    monitor() {
      this.drawer = true
    },
    watch() {
      this.watchStatus = true
      this.$nextTick(() => {
        this.drawLine()
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart1 = this.echarts.init(document.getElementById('myChart1'))
      const myChart2 = this.echarts.init(document.getElementById('myChart2'))
      const myChart3 = this.echarts.init(document.getElementById('myChart3'))
      const myChart4 = this.echarts.init(document.getElementById('myChart4'))
      // 绘制图表
      myChart1.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '压力',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: 80,
                name: '水压'
              }
            ],
            title: {
              color: '#fff'
            }
          }
        ]
      })
      myChart2.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '压力',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: 55,
                name: '电压'
              }
            ],
            title: {
              color: '#fff'
            }
          }
        ]
      })
      myChart3.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '压力',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: 15,
                name: '气压'
              }
            ],
            title: {
              color: '#fff'
            }
          }
        ]
      })
      myChart4.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '压力',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: 20,
                name: '烟雾浓度'
              }
            ],
            title: {
              color: '#fff'
            }
          }
        ]
      })
    }
  }
}
</script>
<style>
  .bigemap-draw-section{top:200px;left: 0px;}
  .box-select {
background: rgba(111, 124, 150, 0.1);
border: 2px solid #40c0f5;
position: absolute;
top: 0;
left: 0;
width: 0;
height: 0;
z-index: 100;
}
</style>
<style scoped>
#container{
  position: absolute;
        top: 0;
        bottom: 0;
        width: 100vw;
        height:100vh;
}
.filter{
          position: absolute;
          top: 24px;
          right: 142px;
          width: 108px;
          height: 32px;
          color: #ffffff;
          line-height: 32px;
          text-align: center;
          background-color: #0179f9;
          border-radius: 4px;
      }
      .filter:hover{
          background-color: #58bc58;
      }
      .province{
          position: absolute;
          top: 24px;
          right: 24px;
          width: 94px;
          height: 32px;
          color: #ffffff;
          line-height: 32px;
          text-align: center;
          background-color: #0179f9;
          border-radius: 4px;
      }
      .province:hover{
          background-color: #58bc58;
      }
      .video{
        display: flex;
        justify-content: space-around;
        padding: 10px;
      }

    /deep/ .el-drawer{
      background-color:#304156;
      height: 40% !important;
    }
    /deep/ .el-drawer__header{
      color: #fff;
    }
</style>
