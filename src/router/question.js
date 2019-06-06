const QuestionList = () => import(/* webpackChunkName: "question-list" */ '@/views/question/QuestionList')
const QuestionDetail = () => import(/* webpackChunkName: "question-detail" */ '@/views/question/QuestionDetail')

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
  },
  {
    path: '/questions/tagged/:tag',
    name: 'question:tagged',
    component: QuestionList,
    props: true
  }
]
