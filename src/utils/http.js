/**
 * ajax请求工具包
 */

// import axios from 'axios'

// export const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:2010' : 'http://106.53.216.45:2010'

// const request = axios.create({
//   baseURL: baseURL + '/api'
// })
// console.log('baseURL=', baseURL)

// // 简化用户的操作
// request.get = function(url, data, config = {}) {

//   return request({
//     url,
//     ...config,
//     params: data
//   })
// }

// export default request

import request from './request_own'

const http = {
  /**
     * methods: 请求
     * @param url 请求地址
     * @param params 请求参数
     */
  get(url, params) {
    const config = {
      method: 'get',
      url: url
    }
    if (params) config.params = params
    return request(config)
  },
  post(url, params) {
    const config = {
      method: 'post',
      url: url
    }
    if (params) config.data = params
    return request(config)
  },
  put(url, params) {
    const config = {
      method: 'put',
      url: url
    }
    if (params) config.params = params
    return request(config)
  },
  delete(url, params) {
    const config = {
      method: 'delete',
      url: url
    }
    if (params) config.params = params
    return request(config)
  }
}
// 导出
export default http
