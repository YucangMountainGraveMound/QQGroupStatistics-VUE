import App from '@/App.vue'
import {authGuard, guestGuard} from "@/router/routerConfig";

const index = r => require.ensure([], () => r(require('@/pages/index')), 'index')
const auth = r => require.ensure([], () => r(require('@/pages/auth')), 'auth')

const overview = r => require.ensure([], () => r(require('@/pages/sub/overview')), 'overview')
const time = r => require.ensure([], () => r(require('@/pages/sub/time')), 'time')
const message = r => require.ensure([], () => r(require('@/pages/sub/message')), 'message')
const image = r => require.ensure([], () => r(require('@/pages/sub/image')), 'image')
const habit = r => require.ensure([], () => r(require('@/pages/sub/habit')), 'habit')
const setting = r => require.ensure([], () => r(require('@/pages/sub/setting')), 'setting')
const notFound = r => require.ensure([], () => r(require('@/pages/notFound')), 'notFound')

export default [
  ...authGuard([
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          name: 'index',
          component: index,
          redirect: '/overview',
          children: [
            {
              path: '/overview',
              name: 'overview',
              component: overview
            },
            {
              path: '/message',
              name: 'message',
              component: message
            },
            {
              path: '/time',
              name: 'time',
              component: time
            },
            {
              path: '/image',
              name: 'image',
              component: image
            },
            {
              path: '/habit',
              name: 'habit',
              component: habit
            },
            {
              path: '/setting',
              name: 'setting',
              component: setting
            }
          ]
        }
      ]
    }
  ]),

  ...guestGuard([
    {
      path: '/auth',
      name: 'auth',
      component: auth
    }
  ]),
  {
    path: "/not_found",
    name: "notFound",
    component: notFound
  },
  {
    path: "*",
    redirect: "/not_found"
  }
]
