import store from '@/store'
import { ANSWERS_FOR_QUESTION_GET_ACTION, QUESTION_GET_ACTION, QUESTIONS_GET_ACTION } from '@/store/constants/actionTypes'

const QuestionList = () => import(/* webpackChunkName: "question-list" */ '@/views/question/QuestionList')
const QuestionDetail = () => import(/* webpackChunkName: "question-detail" */ '@/views/question/QuestionDetail')

function is404Error (err) {
  return err.response && err.response.status === 404
}

export default [
  {
    path: '/questions/',
    name: 'question:list',
    component: QuestionList,
    props: true
  },
  {
    path: '/questions/:id',
    name: 'question:detail',
    component: QuestionDetail,
    props: true
    // beforeEnter: async (to, from, next) => {
    //   try {
    //     const { id: questionId } = to.params
    //     await Promise.all([
    //       store.dispatch(QUESTION_GET_ACTION, questionId),
    //       store.dispatch(ANSWERS_FOR_QUESTION_GET_ACTION, questionId)
    //     ])
    //     next()
    //   } catch (err) {
    //     if (is404Error(err)) {
    //       next({ name: '404', params: { resource: 'question' } })
    //     }
    //   }
    // }
  },
  {
    path: '/questions/tagged/:tag',
    name: 'question:tagged',
    component: QuestionList,
    props: true
  }
]
