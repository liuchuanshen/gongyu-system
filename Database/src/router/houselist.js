const express = require('express')
const mongo = require('../db/mongo')
const router = express.Router()

const { formatData, encrypto } = require('../utils')

const colNameList = 'list'
const colNamePsw = 'password'
const colNameUser = 'user'
const colNameMessagebox = 'messagebox'
const colNameTodolist = 'todolist'
const colNameResources = 'resources'

// api/houselist/list
// 所有租户分页信息
router.get('/list', async(req, res) => {
  let { page = 1, size = 50, sort = 'regtime', total, name } = req.query

  if (name === '' || name === undefined) {
    name = {}
  } else {
    name = { 'xm': name }
  }
  const skip = (page - 1) * size
  const limit = size * 1
  total = !((total == '0' || total == 'false'))
  const result = await mongo.find(colNameList, name, { skip, limit, sort, total })
  res.send(formatData({ data: total ? result : result.result }))
})

// api/houselist/password
// 所有租户分页信息
router.get('/password', async(req, res) => {
  let { page = 1, size = 50, sort = 'regtime', total } = req.query
  const skip = (page - 1) * size
  const limit = size * 1
  total = !((total == '0' || total == 'false'))
  const result = await mongo.find(colNamePsw, {}, { skip, limit, sort, total })
  console.log('result=', result)
  res.send(formatData({ data: total ? result : result.result }))
})

// 新建租客数据写进mongoDB
router.get('/create', async(req, res) => {
  const { id, fh, rzsj, zysj, xm, xb, sfzhm, sjhm, hx, jfqk,status } = req.query
  try {
    await mongo.create(colNameList, { id, fh, rzsj, zysj, xm, xb, sfzhm, sjhm, hx, jfqk,status })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

// api/houselist/update
// 把编辑好的数据更新到mongoDB
router.get('/update', async(req, res) => {
  const { _id, id, fh, rzsj, zysj, xm, sfzhm, sjhm, hx, jfqk } = req.query
  // console.log('id=',id)
  // console.log(_id,id,fh,rzsj,zysj,xm,sfzhm,sjhm,hx,jfqk)

  try {
    await mongo.update(colNameList, { 'id': id }, { _id, id, fh, rzsj, zysj, xm, sfzhm, sjhm, hx, jfqk })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

// api/houselist/temporary
// 新建临时看房的密码数据写进mongoDB
router.get('/temporary', async(req, res) => {
  const { doorPsw, doorPswTime, houseId, housePsw, housePswTime } = req.query
  try {
    await mongo.create(colNamePsw, { doorPsw, doorPswTime, houseId, housePsw, housePswTime })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

// api/houselist/temporaryList
// 所有临时密码列表分页信息
router.get('/temporaryList', async(req, res) => {
  let { page = 1, size = 50, sort = 'regtime', total } = req.query
  const skip = (page - 1) * size
  const limit = size * 1
  total = !((total == '0' || total == 'false'))
  const result = await mongo.find(colNamePsw, {}, { skip, limit, sort, total })
  res.send(formatData({ data: total ? result : result.result }))
})

// api/houselist/tempupdate
// 修改临时密码状态
router.get('/tempupdate', async(req, res) => {
  const { id, status, doorPsw, housePsw } = req.query
  try {
    await mongo.updatetemp(colNamePsw, { 'id': id }, { id, status, doorPsw, housePsw })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

// api/houselist/messagebox
// 所有留言箱列表分页信息
router.get('/messagebox', async(req, res) => {
  let { page = 1, size = 50, sort = 'regtime', total } = req.query
  const skip = (page - 1) * size
  const limit = size * 1
  total = !((total == '0' || total == 'false'))
  const result = await mongo.find(colNameMessagebox, {}, { skip, limit, sort, total })
  res.send(formatData({ data: total ? result : result.result }))
})

// / api/houselist/login
// 登录功能
router.get('/login', async(req, res) => {
  const { username, password } = req.query

  const tokens = {
    admin: {
      token: 'admin-token'
    },
    editor: {
      token: 'editor-token'
    }
  }

  const token = tokens[username]

  // user为数据库的名字
  const result = await mongo.find(colNameUser, { username, password })

  if (result.total > 0) {
    res.send(formatData({
      data: token
    }))
  } else {
    res.send(formatData({ code: 401 }))
  }
})

// api/houselist/createTodolist
// 新建待办事项数据写进mongoDB
router.get('/createTodolist', async(req, res) => {
  const { id, date, houseId, msg, name, process } = req.query
  try {
    await mongo.create(colNameTodolist, { id, date, houseId, msg, name, process })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

// api/houselist/deleteMessage
// 删除留言箱数据功能
router.get('/deleteMessage', async(req, res) => {
  const { id } = req.query
  try {
    await mongo.remove(colNameMessagebox, { id })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

// api/houselist/getTodolist
// 所有待办事项列表分页信息
router.get('/getTodolist', async(req, res) => {
  let { page = 1, size = 50, sort = 'regtime', total } = req.query
  const skip = (page - 1) * size
  const limit = size * 1
  total = !((total == '0' || total == 'false'))
  const result = await mongo.find(colNameTodolist, {}, { skip, limit, sort, total })
  res.send(formatData({ data: total ? result : result.result }))
})

// api/houselist/updateTodolist
// 修改待办事项状态
router.get('/updateTodolist', async(req, res) => {
  const { id, process } = req.query
  try {
    await mongo.updateTodolist(colNameTodolist, { 'id': id }, { process })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

// api/houselist/checkout
// 所有待办事项列表分页信息
router.get('/checkout', async(req, res) => {
  const { id, status } = req.query
  try {
    await mongo.checkout(colNameList, { 'id': id }, { status })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

// api/houselist/resources
// 所有房源信息列表分页信息
router.get('/resources', async(req, res) => {
  let { page = 1, size = 50, sort = 'regtime', total } = req.query
  const skip = (page - 1) * size
  const limit = size * 1
  total = !((total == '0' || total == 'false'))
  const result = await mongo.find(colNameResources, {}, { skip, limit, sort, total })
  res.send(formatData({ data: total ? result : result.result }))
})


// api/houselist/updateTodolist
// 修改房源信息状态
router.get('/updateResources', async(req, res) => {
  const { fh, status } = req.query
  try {
    await mongo.updateResources(colNameResources, { 'fh': fh }, { status })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

module.exports = router
