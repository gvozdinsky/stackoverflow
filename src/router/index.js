import Vue from 'vue'
import Router from 'vue-router'
import questionRouter from './question'
import tagRouter from './tag'
import userRouter from './user'
import DefaultLayout from '@/components/layouts/Default'

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home')
const NotFound = () => import(/* webpackChunkName: "404" */ '@/views/NotFound')

Vue.use(Router)

const index = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        ...tagRouter,
        ...questionRouter,
        ...userRouter,
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
    }
  ]
})


export default index
