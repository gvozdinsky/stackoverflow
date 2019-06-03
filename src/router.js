import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import NotFound from '@/views/NotFound'
import TagList from '@/views/tag/TagList'
import QuestionList from '@/views/question/QuestionList'
import QuestionDetail from '@/views/question/QuestionDetail'
import store from '@/store'
import NProgress from 'nprogress'

Vue.use(Router)

function is404Error (err) {
  return err.response && err.response.status === 404
}

const router = new Router({
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
      component: TagList,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('tag/getTags')
        next()
      }
    },
    {
      path: '/questions',
      name: 'question:list',
      component: QuestionList,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('question/getQuestions', { tag: to.params.tag })
        next()
      }
    },
    {
      path: '/questions/:id',
      name: 'question:detail',
      component: QuestionDetail,
      beforeEnter: async (to, from, next) => {
        try {
          const { id: questionId } = to.params
          await Promise.all([
            store.dispatch('question/getQuestion', questionId),
            store.dispatch('answer/getAnswersForQuestion', questionId)
          ])
          next()
        } catch (err) {
          if (is404Error(err)) {
            next({ name: '404', params: { resource: 'question' } })
          }
        }
      }
    },
    {
      path: '/questions/tagged/:tag',
      name: 'question:tagged',
      component: QuestionList,
      props: true,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('question/getQuestions', { tag: to.params.tag })
        next()
      }
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
