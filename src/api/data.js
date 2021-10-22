import http from '@/utils/http'

export function getlist(data) {
  return http({
    url: '/houselist/houselist',
    method: 'get',
    data
  })
}

export function getuser(data) {
  return http.get('/houselist/list', data)
}

export function createUser(data) {
  return http.get('/houselist/create', data)
}

export function update(data) {
  return http.get('/houselist/update', data)
}

export function temporary(data) {
  return http.get('/houselist/temporary', data)
}

export function temporaryList(data) {
  return http.get('/houselist/temporaryList', data)
}

export function tempupdate(data) {
  return http.get('/houselist/tempupdate', data)
}

export function login(data) {
  return http.get('/houselist/login', data)
}

export function getMessage(data) {
  return http.get('/houselist/messagebox', data)
}