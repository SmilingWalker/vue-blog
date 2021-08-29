import { createStore } from 'vuex'

import user from './modules/user'
import index from "./modules/home"
import message from './modules/message'

export default createStore({
  modules: {
    user,
    index,
    message,
  }
})
