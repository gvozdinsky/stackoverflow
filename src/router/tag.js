const TagList = () => import(/* webpackChunkName: "tag-list" */ '@/views/tag/TagList')

export default [
  {
    path: '/tags',
    name: 'tag:list',
    component: TagList
  }
]
