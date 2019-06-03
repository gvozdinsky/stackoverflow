import Vue from 'vue'
import Vuex from 'vuex'
import questions from '@/store/modules/questions'
import tags from '@/store/modules/tags'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    questions,
    tags
  }
})
