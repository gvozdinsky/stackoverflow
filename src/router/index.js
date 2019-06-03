import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import NotFound from '@/views/NotFound'
import store from '@/store'
import NProgress from 'nprogress'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: CommonLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
      ]
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '*',
      redirect: { name: '404' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
