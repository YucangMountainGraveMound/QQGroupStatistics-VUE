import Router from 'vue-router'
import iView from "iview";
import {getStore} from "@/utils/localStorage";

/**
 * Create a router instance.
 *
 * @param  {Array} routes
 * @return {Router}
 */
export default function router(routes) {
  const router = new Router({
    routes,
    mode: 'history',
    linkActiveClass: 'active'
  })

  router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    next()
  })

  router.afterEach((to, from, next) => {
    iView.LoadingBar.finish()
  })

  return router
}

/**
 * Add the "authenticated" guard.
 *
 * @param  {Array} routes
 * @return {Array}
 */
export function authGuard(routes) {
  return guard(routes, (to, from, next) => {
    if (getStore('token')) {
      next()
    } else {
      next({name: 'auth'})
    }
  })
}

/**
 * Add the "guest" guard.
 *
 * @param  {Array} routes
 * @return {Array}
 */
export function guestGuard(routes) {
  return guard(routes, (to, from, next) => {
    console.log(getStore('token'))
    if (getStore('token')) {
      next({name: 'index'})
    } else {
      next()
    }
  })
}

/**
 * @param  {Array} routes
 * @param  {Function} guard
 * @return {Array}
 */
function guard(routes, guard) {
  routes.forEach(route => {
    route.beforeEnter = guard
  })

  return routes
}
