const UserDetail = () => import(/* webpackChunkName: "user-detail" */ '@/views/user/UserDetail')

export default [
  {
    path: '/user/:id',
    name: 'user:detail',
    component: UserDetail,
    props: true
  }
]
