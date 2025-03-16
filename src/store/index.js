import { createStore } from 'vuex'
import user from './modules/user'
import tasks from './modules/tasks'

const store = createStore({
  modules: {
    user,
    tasks,
  },
})

export default store
