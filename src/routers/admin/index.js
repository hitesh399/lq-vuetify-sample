import Vue from 'vue'
import Router from 'vue-router'

const portal = require('@/utils/portal-helper');
const currentPortal = portal.currentPortal;

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: currentPortal.getRouterBaseUri(),
  routes: [
  ]
})