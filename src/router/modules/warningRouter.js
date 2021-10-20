/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const warningRouter = {
  path: '/warning',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Warning',
  meta: {
    title: 'Warning',
    icon: 'table'
  },
  children: [
    // {
    //   path: 'keyboard',
    //   component: () => import('@/views/charts/keyboard'),
    //   name: 'KeyboardChart',
    //   meta: { title: 'Keyboard Chart', noCache: true }
    // },
    // {
    //   path: 'line',
    //   component: () => import('@/views/charts/line'),
    //   name: 'LineChart',
    //   meta: { title: 'Line Chart', noCache: true }
    // },
    {
      path: 'warning',
      component: () => import('@/views/warning/index'),
      name: 'warning',
      meta: { title: '预警警报', noCache: true }
    }
  ]
}

export default warningRouter
