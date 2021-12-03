import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import warningRouter from './modules/warningRouter'
// import chartsRouter from './modules/charts'
// import tableRouter from "./modules/table";
import nestedRouter from './modules/nested'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // warningRouter,
  // componentsRouter,
  nestedRouter,
  {
    path: '/list',
    name: 'list',
    component: Layout,
    meta: { title: '公寓管理', icon: 'el-icon-office-building' },
    children: [
      {
        path: 'edit',
        name: 'ArticleList',
        component: () => import('@/views/example/list'),
        meta: { title: '住客编辑', icon: 'el-icon-edit-outline' }
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/table/create'),
        meta: { title: '住客录入', icon: 'el-icon-s-custom' }
      },
      {
        path: 'houseManage',
        name: 'create1',
        component: () => import('@/views/table/houseManage'),
        meta: { title: '房源管理', icon: 'el-icon-s-custom' }
      },
      {
        path: 'password',
        component: () => import('@/views/passManage/index'),
        name: 'Password',
        meta: { title: '密码管理', icon: 'password' }
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: '信息导出',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: '信息导出' }
      }
    ]
  },
  {
    path: '/token',
    component: Layout,
    redirect: '/token',
    name: 'token',
    meta: {
      title: '权限管理',
      icon: 'el-icon-location'
    },
    children: [
      {
        path: '/token/list',
        component: () => import('@/views/token'),
        name: 'house',
        meta: { title: '权限管理' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/message',
    component: Layout,
    redirect: '/message',
    name: 'box',
    meta: {
      title: '留言箱',
      icon: 'el-icon-location'
    },
    children: [
      {
        path: '/message',
        component: () => import('@/views/message'),
        name: '留言箱',
        meta: { title: '留言箱' }
      }
    ]
  }

]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
