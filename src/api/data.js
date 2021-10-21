import http from '@/utils/http'

export function getlist(data) {
  return http({
    url: '/houselist/houselist',
    method: 'get',
    data
  })
}

