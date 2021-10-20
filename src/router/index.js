import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
import warningRouter from './modules/warningRouter'
import chartsRouter from './modules/charts'
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
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
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
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  warningRouter,
  // componentsRouter,
  nestedRouter,
  //   {
  //     path: "/example",
  //     component: Layout,
  //     redirect: "/example/list",
  //     name: "Example",
  //     meta: {
  //       title: "Example",
  //       icon: "el-icon-s-help"
  //     },
  //     children: [
  //       {
  //         path: "edit/:id(\\d+)",
  //         component: () => import("@/views/example/edit"),
  //         name: "EditArticle",
  //         meta: {
  //           title: "Edit Article",
  //           noCache: true,
  //           activeMenu: "/example/list"
  //         },
  //         hidden: true
  //       },
  //       {
  //         path: "list",
  //         component: () => import("@/views/example/list"),
  //         name: "ArticleList",
  //         meta: { title: "住客管理", icon: "list" }
  //       }
  //     ]
  //   },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    meta: { title: '公寓管理', icon: 'el-icon-office-building' },
    children: [
      {
        path: 'article-list',
        name: 'ArticleList',
        component: () => import('@/views/example/list'),
        meta: { title: '住客编辑', icon: 'el-icon-edit-outline' }
      },
      {
        path: 'complex-table',
        name: 'ComplexTable',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '住客录入', icon: 'el-icon-s-custom' }
      },
      {
        path: 'password',
        component: () => import('@/views/passManage/index'),
        name: 'Password',
        meta: { title: '密码管理', icon: 'password' }
      },
      {
        path: 'tab',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: '水电费管理', icon: 'tab' }
      }
    ]
  },
<<<<<<< HEAD

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },
=======
>>>>>>> 8f3458175889d878bf37bdefea044bb3cffb660d
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
      },
    ]
  },

  {
    path: '/map',
    component: Layout,
    redirect: '/map',
    name: 'Excel',
    meta: {
      title: '公寓情况',
      icon: 'el-icon-location'
    },
    children: [
      {
        path: '/map',
        component: () => import('@/views/map'),
        name: 'house',
        meta: { title: '公寓情况' }
      }
    ]
  },
  chartsRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
