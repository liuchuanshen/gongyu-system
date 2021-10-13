const Mock = require('mockjs')

const List = [
  // 住客管理模块
  { id: 1, fh: '101', rzsj: '2020-1-2', zysj: '2021-12-31', xm: '张三', sfzhm: '440182193875122', sjhm: '13762547362', hx: '一房一厅', jfqk: 'y' },
  { id: 2, fh: '102', rzsj: '2021-10-2', zysj: '2021-12-31', xm: '李四', sfzhm: '440182193875122X', sjhm: '13764547362', hx: '单间厅', jfqk: 'n' },
  { id: 3, fh: '201', rzsj: '2020-4-10', zysj: '2021-12-31', xm: '王育林', sfzhm: '440182193875122', sjhm: '1376254362', hx: '两房一厅', jfqk: 'y' },
  { id: 4, fh: '202', rzsj: '2020-5-5', zysj: '2021-12-31', xm: '江韵琳', sfzhm: '440182193875122X', sjhm: '13362547362', hx: '单间厅', jfqk: 'y' },
  { id: 5, fh: '301', rzsj: '2019-3-17', zysj: '2021-12-31', xm: '刘飞', sfzhm: '440182193875122', sjhm: '13362547362', hx: '两房一厅', jfqk: 'y' },
  { id: 6, fh: '302', rzsj: '2020-8-5', zysj: '2021-12-31', xm: '王小五', sfzhm: '440182193875122', sjhm: '13962547362', hx: '两房一厅', jfqk: 'n' },
  { id: 7, fh: '401', rzsj: '2020-11-25', zysj: '2021-12-31', xm: '卢科研', sfzhm: '440182193875122X', sjhm: '137625237362', hx: '三房两厅', jfqk: 'y' },
  { id: 8, fh: '402', rzsj: '2017-1-25', zysj: '2021-12-31', xm: '哈力克', sfzhm: '440182193875122', sjhm: '137625433232', hx: '单间厅', jfqk: 'y' },
  { id: 9, fh: '501', rzsj: '2028-9-20', zysj: '2021-12-31', xm: '西坝口', sfzhm: '440182193875122X', sjhm: '13762541262', hx: '一房一厅', jfqk: 'n' },
  { id: 10, fh: '502', rzsj: '2021-2-27', zysj: '2021-12-31', xm: '阿萨德', sfzhm: '440182193875122', sjhm: '13126254362', hx: '一房一厅', jfqk: 'y' },

  // 水电费管理_水费
  { id: 1, fh: '101', 'sysf': '20', 'syds': '123', 'jysf': '100', 'jyds': '200', 'status': 'y', 'type': 'SF' },
  { id: 2, fh: '102', 'sysf': '66', 'syds': '1210', 'jysf': '100', 'jyds': '200', 'status': 'y', 'type': 'SF' },
  { id: 3, fh: '201', 'sysf': '345', 'syds': '120', 'jysf': '100', 'jyds': '200', 'status': 'y', 'type': 'SF' },
  { id: 4, fh: '202', 'sysf': '145', 'syds': '120', 'jysf': '100', 'jyds': '200', 'status': 'y', 'type': 'SF' },
  { id: 5, fh: '301', 'sysf': '1435', 'syds': '120', 'jysf': '100', 'jyds': '200', 'status': 'y', 'type': 'SF' },
  { id: 6, fh: '302', 'sysf': '104', 'syds': '120', 'jysf': '100', 'jyds': '200', 'status': 'y', 'type': 'SF' },
  { id: 7, fh: '401', 'sysf': '150', 'syds': '120', 'jysf': '100', 'jyds': '200', 'status': 'y', 'type': 'SF' },
  { id: 8, fh: '402', 'sysf': '130', 'syds': '120', 'jysf': '100', 'jyds': '200', 'status': 'y', 'type': 'SF' },
  { id: 9, fh: '501', 'sysf': '80', 'syds': '120', 'jysf': '100', 'jyds': '200', 'status': 'y', 'type': 'SF' },
  { id: 10, fh: '502', 'sysf': '110', 'syds': '120', 'jysf': '100', 'jyds': '200', 'status': 'y', 'type': 'SF' },

  // 水电费管理_电费
  { id: 1, fh: '101', 'sydf': '100', 'syds': '200', 'jydf': '100', 'jyds': '120', 'status': 'n', 'type': 'DF' },
  { id: 2, fh: '102', 'sydf': '100', 'syds': '200', 'jydf': '100', 'jyds': '120', 'status': 'n', 'type': 'DF' },
  { id: 3, fh: '201', 'sydf': '100', 'syds': '200', 'jydf': '100', 'jyds': '120', 'status': 'n', 'type': 'DF' },
  { id: 4, fh: '202', 'sydf': '100', 'syds': '200', 'jydf': '100', 'jyds': '120', 'status': 'n', 'type': 'DF' },
  { id: 5, fh: '301', 'sydf': '100', 'syds': '200', 'jydf': '100', 'jyds': '120', 'status': 'n', 'type': 'DF' },
  { id: 6, fh: '302', 'sydf': '100', 'syds': '200', 'jydf': '100', 'jyds': '120', 'status': 'n', 'type': 'DF' },
  { id: 7, fh: '401', 'sydf': '100', 'syds': '200', 'jydf': '100', 'jyds': '120', 'status': 'n', 'type': 'DF' },
  { id: 8, fh: '402', 'sydf': '100', 'syds': '200', 'jydf': '100', 'jyds': '120', 'status': 'n', 'type': 'DF' },
  { id: 9, fh: '501', 'sydf': '100', 'syds': '200', 'jydf': '100', 'jyds': '120', 'status': 'n', 'type': 'DF' },
  { id: 10, fh: '502', 'sydf': '100', 'syds': '200', 'jydf': '100', 'jyds': '120', 'status': 'n', 'type': 'DF' },

  // 水电费管理_网费
  { id: 1, fh: '101', 'sywf': '100', 'syds': '50', 'jywf': '100', 'jyds': '44', 'status': 'n', 'type': 'WF' },
  { id: 2, fh: '102', 'sywf': '100', 'syds': '50', 'jywf': '100', 'jyds': '44', 'status': 'n', 'type': 'WF' },
  { id: 3, fh: '201', 'sywf': '100', 'syds': '50', 'jywf': '100', 'jyds': '44', 'status': 'n', 'type': 'WF' },
  { id: 4, fh: '202', 'sywf': '100', 'syds': '50', 'jywf': '100', 'jyds': '44', 'status': 'n', 'type': 'WF' },
  { id: 5, fh: '301', 'sywf': '100', 'syds': '50', 'jywf': '100', 'jyds': '44', 'status': 'n', 'type': 'WF' },
  { id: 6, fh: '302', 'sywf': '100', 'syds': '50', 'jywf': '100', 'jyds': '44', 'status': 'n', 'type': 'WF' },
  { id: 7, fh: '401', 'sywf': '100', 'syds': '50', 'jywf': '100', 'jyds': '44', 'status': 'n', 'type': 'WF' },
  { id: 8, fh: '402', 'sywf': '100', 'syds': '50', 'jywf': '100', 'jyds': '44', 'status': 'n', 'type': 'WF' },
  { id: 9, fh: '501', 'sywf': '100', 'syds': '50', 'jywf': '100', 'jyds': '44', 'status': 'n', 'type': 'WF' },
  { id: 10, fh: '502', 'sywf': '100', 'syds': '50', 'jywf': '100', 'jyds': '44', 'status': 'n', 'type': 'WF' }

]

// const count = 100
// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
// for (let i = 0; i < count; i++) {
//   List.push(Mock.mock({
//     id: '@increment',
//     timestamp: +Mock.Random.date('T'),
//     author: '@first',
//     reviewer: '@first',
//     title: '@title(5, 10)',
//     content_short: 'mock data',
//     content: baseContent,
//     forecast: '@float(0, 100, 2, 2)',
//     importance: '@integer(1, 3)',
//     'type|1': ['CN', 'US', 'JP', 'EU'],
//     'status|1': ['published', 'draft'],
//     display_time: '@datetime',
//     comment_disabled: true,
//     pageviews: '@integer(300, 5000)',
//     image_uri,
//     platforms: ['a-platform']
//   }))
// }

module.exports = [
  {
    url: '/vue-element-admin/article/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort, name } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        if (name && item.xm !== name) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: pageList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

