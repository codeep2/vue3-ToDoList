import { createStore } from 'vuex'

interface ToDos {
  [key: string]: string;
  STORAGE_KEY: string;
  title: string;
}

export default createStore({
  state: {
    todos: {} as ToDos
  },
  mutations: {
    save (state, payload) {
      const title = payload.title
      state.todos[title] = payload.todo
      localStorage.setItem(payload.STORAGE_KEY, JSON.stringify(state.todos))
    },
    fetch (state, key) {
      state.todos = JSON.parse(localStorage.getItem(key.STORAGE_KEY) || '{}')
    }
  }
})
