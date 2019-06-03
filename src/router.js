import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import TagList from '@/views/tag/TagList'
import QuestionList from '@/views/question/QuestionList'
import QuestionDetail from '@/views/question/QuestionDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tags',
      name: 'tag:list',
      component: TagList
    },
    {
      path: '/questions',
      name: 'question:list',
      component: QuestionList
    },
    {
      path: '/questions/:id',
      name: 'question:detail',
      component: QuestionDetail,
      props: true
    },
    {
      path: '/questions/tagged/:tag',
      name: 'question:tagged',
      component: QuestionList,
      props: true
    }
  ]
})
