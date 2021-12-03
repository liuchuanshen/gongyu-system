const { MongoClient, ObjectId } = require('mongodb')

const config = {
  url: 'mongodb://localhost:27017',
  dbName: 'houselist'
}

async function connect() {
  try {
    const client = await MongoClient.connect(config.url, { useUnifiedTopology: true })
    const db = client.db(config.dbName)
    return { client, db }
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * 增：添加数据
 * @param {String}          colName     集合名称
 * @param {Object|Array}    data        插入数据
 */
async function create(colName, data) {
  // 连接数据库
  const { db, client } = await connect()
  // 获取集合
  const col = db.collection(colName)
  if (!Array.isArray(data)) {
    data = [data]
  }
  const result = await col.insertMany(data)
  console.log('create=', result)
  // 关闭数据库连接
  client.close()
  return result
}
//   create('user',{})

/**
 * 删：删除数据
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */
async function remove(colName, query) {
  // 连接数据库
  const { db, client } = await connect()
  // 获取集合
  const col = db.collection(colName)

  const result = await col.deleteMany(query)
  client.close()
  return result
}

/**
 * 改：修改数据
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 * @param {Object} data     更新操作
 */
async function update(colName, query, data) {
  const { db, client } = await connect()

  // 获取集合
  const col = db.collection(colName)

  if (typeof query._id === 'string') {
    // 600a398f7fb70cd40a42e1f9 -> ObjectId("600a398f7fb70cd40a42e1f9")
    query._id = ObjectId(query._id)
  }

  const result = await col.updateOne(query, { $set: { 'fh': data.fh, 'rzsj': data.rzsj, 'zysj': data.zysj, 'xm': data.xm, 'sfzhm': data.sfzhm, 'sjhm': data.sjhm, 'hx': data.hx, 'jfqk': data.jfqk }})

  client.close()
  return result
}

/**
 * 改：修改临时密码状态
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 * @param {Object} data     更新操作
 */
async function updatetemp(colName, query, data) {
  const { db, client } = await connect()

  // 获取集合
  const col = db.collection(colName)

  if (typeof query._id === 'string') {
    // 600a398f7fb70cd40a42e1f9 -> ObjectId("600a398f7fb70cd40a42e1f9")
    query._id = ObjectId(query._id)
  }

  const result = await col.updateOne(query, { $set: { 'status': data.status, 'doorPsw': data.doorPsw, 'housePsw': data.housePsw }})

  client.close()
  return result
}

/**
 * 改：修改用户登录信息
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 * @param {Object} data     更新操作
 */
 async function updatetoken(colName, query, data) {
  const { db, client } = await connect()

  // 获取集合
  const col = db.collection(colName)

  if (typeof query._id === 'string') {
    // 600a398f7fb70cd40a42e1f9 -> ObjectId("600a398f7fb70cd40a42e1f9")
    query._id = ObjectId(query._id)
  }

  const result = await col.updateOne(query, { $set: { 'status': data.status}})

  client.close()
  return result
}

/**
 * 改：修改待办事项状态
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 * @param {Object} data     更新操作
 */
async function updateTodolist(colName, query, data) {
  const { db, client } = await connect()

  // 获取集合
  const col = db.collection(colName)

  if (typeof query._id === 'string') {
    // 600a398f7fb70cd40a42e1f9 -> ObjectId("600a398f7fb70cd40a42e1f9")
    query._id = ObjectId(query._id)
  }

  const result = await col.updateOne(query, { $set: { 'process': data.process, 'status': data.status }})

  client.close()
  return result
}

/**
 * 改：退房修改状态
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 * @param {Object} data     更新操作
 */
async function checkout(colName, query, data) {
  const { db, client } = await connect()

  // 获取集合
  const col = db.collection(colName)

  if (typeof query._id === 'string') {
    // 600a398f7fb70cd40a42e1f9 -> ObjectId("600a398f7fb70cd40a42e1f9")
    query._id = ObjectId(query._id)
  }

  const result = await col.updateOne(query, { $set: { 'status': data.status }})

  client.close()
  return result
}

/**
 * 改：房源信息修改状态
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 * @param {Object} data     更新操作
 */
async function updateResources(colName, query, data) {
  const { db, client } = await connect()

  // 获取集合
  const col = db.collection(colName)

  if (typeof query._id === 'string') {
    // 600a398f7fb70cd40a42e1f9 -> ObjectId("600a398f7fb70cd40a42e1f9")
    query._id = ObjectId(query._id)
  }

  const result = await col.updateOne(query, { $set: { 'status': data.status }})

  client.close()
  return result
}

/**
   * 查：查询数据
   * @param {String} colName    集合名称
   * @param {Object} query      查询条件
   * @param {Object} options
        * fields    过滤字段
        * skip      跳过数量（用于数据分页）
        * limit     限制数量（用于数据分页）
        * sort      排序
   * @return {Array}            返回数据结果
   */
async function find(colName, query = {}, { fields, skip, limit, sort } = {}) {
  const { db, client } = await connect()

  // 获取集合
  const col = db.collection(colName)
  if (typeof query._id === 'string') {
    // 600a398f7fb70cd40a42e1f9 -> ObjectId("600a398f7fb70cd40a42e1f9")
    query._id = ObjectId(query._id)
  }

  // 操作数据库
  let result = col.find(query, {
    // 过滤字段
    projection: fields
  })

  // 获取总数量
  const count = await result.count()

  // 排序
  if (sort) { // sort='price' sort='price,1'
    const [key, val = -1] = sort.trim().split(/\s*,\s*/)// ['price'], ['price','1']
    result = result.sort({
      [key]: val * 1
    })
  }

  if (skip) {
    result = result.skip(skip)
  }

  if (limit) {
    result = result.limit(limit)
  }

  result = await result.toArray()

  // 关闭连接
  client.close()

  return { total: count, result }
}

module.exports = {
  create,
  remove,
  update,
  find,
  updatetemp,
  updatetoken,
  updateTodolist,
  checkout,
  updateResources
}

//   db.getCollection('password').insert([ { id: '1', fh: '101', rzsj: '2020-1-2', zysj: '2021-12-31', xm: '张三', csmm: '239294', sjhm: '13762547362'},{ id: '2', fh: '102', rzsj: '2021-10-2', zysj: '2021-12-31', xm: '李四', csmm: '831254', sjhm: '13764547362'},{ id: '3', fh: '201', rzsj: '2020-4-10', zysj: '2021-12-31', xm: '王育林', csmm: '439292', sjhm: '1376254362'},{ id: '4', fh: '202', rzsj: '2020-5-5', zysj: '2021-12-31', xm: '江韵琳', csmm: '791224', sjhm: '13362547362'},{ id: '5', fh: '301', rzsj: '2019-3-17', zysj: '2021-12-31', xm: '刘飞', csmm: '632291', sjhm: '13362547362'},{ id: '6', fh: '302', rzsj: '2020-8-5', zysj: '2021-12-31', xm: '王小五', csmm: '291294', sjhm: '13962547362'},{ id: '7', fh: '401', rzsj: '2020-11-25', zysj: '2021-12-31', xm: '卢科研', csmm: '239294', sjhm: '137625237362'},{ id: '8', fh: '402', rzsj: '2017-1-25', zysj: '2021-12-31', xm: '哈力克', csmm: '431204', sjhm: '137625433232'},{ id: '9', fh: '501', rzsj: '2028-9-20', zysj: '2021-12-31', xm: '西坝口', csmm: '021294', sjhm: '13762541262'},{ id: '10', fh: '502', rzsj: '2021-2-27', zysj: '2021-12-31', xm: '阿萨德', csmm: '439292', sjhm: '13126254362'},])
