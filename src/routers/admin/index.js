import Vue from 'vue'
import Router from 'vue-router'
import { AuthRoutes } from '../auth'
import NotFound from '@/views/404'
import Parent from '@/views/ParentRouteView'
import dashboard from '@/views/Admin/Dashboard/routes'
import adminUser from '@/views/Admin/AdminUser/routes'
import developer from '@/views/Admin/Developer/routes'
import Logout from '@/views/Logout'
import role from '@/views/Admin/Role/routes'
import config from '@/views/Admin/Config/routes'
import notificationTemplate from '@/views/Admin/NotificationTemplate/routes'

const portal = require('@/utils/portal-helper');
const currentPortal = portal.currentPortal;
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: currentPortal.getRouterBaseUri(),
  routes: [
    {
      path: '/',
      redirect: '/auth',
      hidden: true
    },
    {
      path: '/auth',
      title: 'Auth',
      component: Parent,
      hidden: true,
      children: AuthRoutes
    },
    dashboard,
    adminUser,
    notificationTemplate,
    role,
    config,
    developer,
    {
      path: '*',
      name: 'NotFound',
      title: 'NotFound',
      component: NotFound,
      hidden: true,
      meta: { heading: 'NotFound' }
    },
    {
      path: '/logout',
      name: 'logout',
      title: 'Log Out',
      component: Logout,
      hidden: true,
      meta: {
        heading: 'Log Out',
        icon: 'logout',
        permission: 'admin.logout'
      }
    },
  ]
})