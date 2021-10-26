const express = require('express')
const mongo = require('../db/mongo')
const router = express.Router()
const { formatData, encrypto } = require('../utils')

const colName = 'houselist'

// console.log('colName',colName)

// <----->
// api/house/create
// 把用户信息数据写进mongoDB
router.get('/create', async(req, res) => {
  const { name, id, age, address, houseId, inDate, delivery, phoneNum, remarks, radio } = req.query
  try {
    await mongo.create(colName, { name, id, age, address, houseId, inDate, delivery, phoneNum, remarks, radio })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

// api/house/list
// 分页信息
router.get('/list', async(req, res) => {
  console.log('req.query=', req.query)

  let { page = 1, size = 50, sort = 'regtime', total } = req.query
  const skip = (page - 1) * size
  const limit = size * 1
  total = !((total == '0' || total == 'false'))
  const result = await mongo.find(colName, {}, { skip, limit, sort, total })
  console.log('result=', result)
  res.send(formatData({ data: total ? result : result.result }))
})

// api/house/houselist
// 所有房号分页信息
router.get('/houselist', async(req, res) => {
  let { page = 1, size = 50, sort = 'regtime', total } = req.query
  const skip = (page - 1) * size
  const limit = size * 1
  total = !((total == '0' || total == 'false'))
  const result = await mongo.find(colName, {}, { skip, limit, sort, total })
  console.log('result=', result)
  res.send(formatData({ data: total ? result : result.result }))
})

// <----->

// // api/house/reg
// //把数据写进mongoDB
// router.post('/reg',async (req,res)=>{

//     let {username,password} = req.body;

//     password = encrypto(password)
//     // const {insertedCount} = await mongo.create(colName,{username,password});

//     try{
//         await mongo.create('user',{username,password});
//         res.send(formatData())
//     }catch(err){
//         res.send(formatData({code:400}))
//     }

//     console.log('username=',username,'password=',password)
//     // if(insertedCount>0){
//     //     res.send(formatData())
//     // }else{
//     //     res.send(formatData({code:400}))
//     //         }
// })

// // /user/login
// router.get('/login',async (req,res)=>{
// //   res.send('123')
// let {username,password} = req.query;

// // 加密密码
// password = encrypto(password)
// //user为数据库的名字
// const result = await mongo.find('user',{username,password});

// if(result.total > 0){
//     res.send(formatData({
//         data:result.result[0]
//     }))
// }else{
//     console.log(666)
//     res.send(formatData({code:401}))
// }
// })

// // /user/check
// router.get('/check',async (req,res)=>{
//     const {username} = req.query;

//     const result = await mongo.find('user',{username})
//     if(result.total>0){
//         res.send(formatData({code:400}))
//     }else{
//         res.send(formatData())
//     }
// })

// // /user/find
// // 查询某个商品是否存在
// router.get('/find',async (req,res)=>{
//     let {id} = req.query;

//     let result = await mongo.find('tvb_index',{id})
//     // const result = await mongo.find(colname,{},{skip,limit,sort,total})
//     if(result.total>0){
//         // res.send(formatData({data:result?result:result.result}))
//         res.send(result.result[0])
//     }else{
//         res.send(formatData({code:400}))
//     }
// })

// // 全部商品
// router.get('/list',async (req,res)=>{
//     let {page=1,size=50,sort='regtime',total} = req.query;
//     let skip = (page-1)*size;
//     let limit = size*1;
//     total = (total=='0'||total=='false') ? false : true;
//     //tvb_index为数据库的名字
//     const result = await mongo.find('bacao_index',{},{skip,limit,sort,total})
//     // const result = await mongo.find(colname,{},{skip,limit,sort,total})
//     // console.log('result=',result)
//     res.send(formatData({data:total?result:result.result}))
// })

// // 获取单个商品
// router.get('/:id',async (req,res)=>{
//     const {id} = req.params;
//     console.log('id',id)
//     const {result} = await mongo.find('tvb_index',{_id:id})
//     res.send(formatData({
//         data:result[0]
//     }))
// });

module.exports = router
