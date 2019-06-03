import Vue from 'vue'
import Vuex from 'vuex'
import question from '@/store/modules/question'
import tag from '@/store/modules/tag'
import answer from '@/store/modules/answer'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    question,
    tag,
    answer
  }
})
