/**
 * ajax请求工具包
 */

import axios from 'axios'

export const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:2010' : 'http://106.53.216.45:2010'

const request = axios.create({
  baseURL: baseURL + '/api'
})
console.log('baseURL=', baseURL)

// 简化用户的操作
request.get = function(url, data, config = {}) {
  return request({
    url,
    ...config,
    params: data
  })
}

export default request
