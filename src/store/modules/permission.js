import { asyncRoutes, constantRoutes } from '@/router'
import { getRouter } from '@/api/router'
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

// async function loader(str) {
//   const component = await import(str)
//   return component
// }

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
export function generaMenu(routes, data) {
  data.forEach(item => {
    // alert(JSON.stringify(item))
    const rootFlag = item.redirect === '#'
    const menu = {
      path: rootFlag ? item.funId + '_key' : item.redirect,
      component: rootFlag ? Layout : () => import(`@/views${item.redirect}`),
      redirect: rootFlag ? 'noRedirect' : '',
      children: [],
      name: item.name,
      hidden: item.hidden,
      alwaysShow: !!rootFlag,
      meta: { title: item.meta.title, icon: rootFlag ? item.meta.icon : null, id: item.funId, roles: ['admin'] }
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    console.log(menu, 'menu')
    if (menu.children.length > 0) {
      menu.children.forEach(e => {
        if (e.children.length === 0) {
          delete e.children
        }
      })
    }
    routes.push(menu)
  })
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const loadMenuData = []
      // 先查询后台并返回左侧菜单数据并把数据添加到路由
      getRouter().then(response => {
        let data = response
        if (response.status !== 200) {
          this.$message({
            message: '菜单数据加载异常',
            type: 0
          })
        } else {
          data = response.data
          console.log(data)
          Object.assign(loadMenuData, data)
          generaMenu(asyncRoutes, loadMenuData)
          let accessedRoutes
          if (roles.includes('admin')) {
            // alert(JSON.stringify(asyncRoutes))
            accessedRoutes = asyncRoutes || []
          } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
          }

          commit('SET_ROUTES', accessedRoutes)
          console.log(accessedRoutes)
          resolve(accessedRoutes)
        }
        // generaMenu(asyncRoutes, data)
      }).catch(error => {
        console.log(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
