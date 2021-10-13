const Mock = require('mockjs')

const NameList = []
const count = 100

for (let i = 0; i < count; i++) {
  NameList.push(Mock.mock({
    name: '@first'
  }))
}
NameList.push({ name: 'mock-Pan' })

module.exports = [
  // username search
  {
    url: '/vue-element-admin/search/user',
    type: 'get',
    response: config => {
      const { name } = config.query
      const mockNameList = NameList.filter(item => {
        const lowerCaseName = item.name.toLowerCase()
        return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
      })
      return {
        code: 20000,
        data: { items: mockNameList }
      }
    }
  },

  // transaction list
  {
    url: '/vue-element-admin/transaction/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          // total: 20,
          // 'items|20': [{
          //   order_no: '@guid()',
          //   timestamp: +Mock.Random.date('T'),
          //   username: '@name()',
          //   price: '@float(1000, 15000, 0, 2)',
          //   'status|1': ['success', 'pending']
          // }]
          items: [
            { msg: '402号房 11月网费应收102元', price: '102', status: 'y' },
            { msg: '302号房 11月水电费应收346.3元', price: '102', status: 'y' },
            { msg: '201号房 11月网费应收102元', price: '102', status: 'n' },
            { msg: '512号房 11月水电费应收202元', price: '102', status: 'n' },
            { msg: '822号房 11月网费应收22元', price: '102', status: 'n' },
            { msg: '232号房 11月网费应收52元', price: '102', status: 'n' },
            { msg: '212号房 11月电费应收82.87元', price: '102', status: 'y' },
            { msg: '122号房 11月水费应收42元', price: '102', status: 'y' }
          ]
        }
      }
    }
  }
]
