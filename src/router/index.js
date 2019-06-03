import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import NotFound from '@/views/NotFound'
import NProgress from 'nprogress'
import questionRouter from './question'
import tagRouter from './tag'

Vue.use(Router)

const index = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '',
    //   component: CommonLayout,
    //   children: [
    //     {
    //       path: '/home',
    //       name: 'home',
    //       component: Home
    //     },
    //   ]
    // },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    ...tagRouter,
    ...questionRouter,
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

index.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

index.afterEach(() => {
  NProgress.done()
})
export default index
