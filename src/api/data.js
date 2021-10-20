import http from '@/utils/http'

export function getlist(data) {
  return http({
    url: '/house/houselist',
    method: 'get',
    data
  })
}

