import store from '@/store'
import { TAGS_GET_ACTION } from '@/store/actionTypes'

const TagList = () => import(/* webpackChunkName: "tag-list" */ '@/views/tag/TagList')

export default [
  {
    path: '/tags',
    name: 'tag:list',
    component: TagList,
    beforeEnter: async (to, from, next) => {
      await store.dispatch(TAGS_GET_ACTION)
      next()
    }
  }
]
