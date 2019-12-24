import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '导流平台后台', icon: 'dashboard' }
    }]
  },

  {
    path: '/userManagement',
    component: Layout,
    redirect: '/userManagement/normalUserManagement',
    name: 'userManagement',
    meta: { title: '用户管理', icon: 'user' },
    children: [{
      path: 'normalUserManagement',
      name: 'normalUserManagement',
      component: () => import('@/views/userManagement/normalUserManagement'),
      meta: { title: '普通用户' },
      children: []
    }, {
      path: 'agentManagement',
      name: 'agentManagement',
      component: () => import('@/views/userManagement/agentManagement'),
      meta: { title: '代理商' },
      children: []
    }, {
      path: 'userDetail',
      name: 'userDetail',
      component: () => import('@/views/userManagement/userDetail'),
      meta: { title: '用户详情' },
      hidden: true
    }, {
      path: 'agentDetail',
      name: 'agentDetail',
      component: () => import('@/views/userManagement/agentDetail/agentDetail'),
      meta: { title: '代理商详情' },
      hidden: true
    }, {
      path: 'agentLeave',
      name: 'agentLeave',
      component: () => import('@/views/userManagement/agentDetail/agentLeave'),
      meta: { title: '离职详情' },
      hidden: true
    }]
  },

  {
    path: '/orderManagement',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '订单管理', icon: 'list' },
    children: [{
      path: 'cardManagement',
      name: 'cardManagement',
      component: () => import('@/views/orderManagement/cardManagement'),
      meta: { title: '申卡管理' }
    }, {
      path: 'loanManagement',
      name: 'loanManagement',
      component: () => import('@/views/orderManagement/loanManagement'),
      meta: { title: '申贷管理' }
    }, {
      path: 'orderDetail',
      name: 'orderDetail',
      component: () => import('@/views/orderManagement/orderDetail'),
      meta: { title: '订单详情' },
      hidden: true
    }]

  },

  {
    path: '/productManagement',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '产品管理', icon: 'tree' },
    children: [{
      path: 'creditCardManagement',
      name: 'creditCardManagement',
      component: () => import('@/views/productManagement/creditCardManagement'),
      meta: { title: '信用卡产品管理' }
    }, {
      path: 'creditProductManagement',
      name: 'creditProductManagement',
      component: () => import('@/views/productManagement/creditProductManagement'),
      meta: { title: '信贷产品管理' }
    }, {
      path: 'cardDetail',
      name: 'cardDetail',
      component: () => import('@/views/productManagement/cardDetail'),
      meta: { title: '信用卡产品详情' },
      hidden: true
    }, {
      path: 'productDetail',
      name: 'productDetail',
      component: () => import('@/views/productManagement/productDetail'),
      meta: { title: '信贷产品详情' },
      hidden: true
    }]
  },

  {
    path: '/approvalManagement',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '审批管理', icon: 'skill' },
    alwaysShow: true,
    children: [{
      path: 'approvalManagement',
      name: 'approvalManagement',
      component: () => import('@/views/approvalManagement/approvalManagement'),
      meta: { title: '审批列表' }
    }]
  },

  {
    path: '/financialManagement',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '财务管理', icon: 'money' },
    alwaysShow: true,
    children: [{
      path: 'financialManagement',
      name: 'financialManagement',
      component: () => import('@/views/financialManagement/financialManagement'),
      meta: { title: '流水列表' }
    }]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '系统管理', icon: 'setting' },
    children: [{
      path: 'adminList',
      name: 'adminList',
      component: () => import('@/views/system/adminList'),
      meta: { title: '管理员' }
    }, {
      path: 'role',
      name: 'role',
      component: () => import('@/views/system/role'),
      meta: { title: '角色管理' }
    }, {
      path: 'menu',
      name: 'menu',
      component: () => import('@/views/system/menu'),
      meta: { title: '菜单' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
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
