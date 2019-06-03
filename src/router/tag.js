import store from '@/store'
import TagList from '@/views/tag/TagList'
import { TAGS_GET_ACTION } from '@/store/actionTypes'

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
