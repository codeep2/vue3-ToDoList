<template lang="pug">
div.todolist__card
  div.todolist__card-header
    TheHeader(:headerTitle="title")
      SvgIcon(iconName="ellipsis" @click="addtodo")
  div.todolist__card-body
    ul.todos
      template(v-for="todo in todos[title]")
        li.todo
          label(
            @click="editToDo(todo)"
            v-show="!todo.isinput"
          ) {{ todo.content }}
          input(
            type="text"
            placeholder="Input Something"
            v-show="todo.isinput"
            v-model="todo.content"
            v-focus
            @blur="editDone(todo)"
            @keyup.enter="editDone(todo)"
          )
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import TheHeader from '@/components/TheHeader.vue'
import SvgIcon from '@/components/SvgIcon.vue'

import '@/assets/icon/ellipsis.svg'

export default defineComponent({
  components: {
    SvgIcon,
    TheHeader
  },
  props: {
    title: {
      type: String
    }
  },
  directives: {
    focus: {
      mounted (el) {
        el.focus()
      }
    }
  },
  setup (props) {
    const route = useRoute()
    const store = useStore()
    const date = route.params.date as string
    const todos = computed(() => store.state.todos)
    const title = props.title as string

    const addtodo = () => {
      if (!todos.value[title]) {
        store.commit('save', {
          STORAGE_KEY: date,
          title: title,
          todo: [{
            content: '',
            isinput: true
          }]
        })
      } else {
        todos.value[title].push({
          content: '',
          isinput: true
        })
      }
    }

    const editToDo = (todo: { isinput: boolean }) => {
      todo.isinput = true
    }

    const editDone = (todo: { content: string; isinput: boolean }) => {
      if (!todo.content) {
        todos.value[title].pop()
      } else {
        todo.isinput = false
      }
    }

    watch(todos, (newtodo) => {
      store.commit('save', {
        STORAGE_KEY: date,
        title: title,
        todo: newtodo[title]
      })
    }, { deep: true })

    onMounted(() => {
      store.commit('fetch', { STORAGE_KEY: date })
    })

    return {
      todos,
      addtodo,
      editToDo,
      editDone
    }
  }
})
</script>

<style lang="scss" scoped>
  .todolist {
    &__card {
      width: 330px;
      height: 530px;
      padding: 20px;
      margin: 0 25px;
      border-radius: 20px;
      box-shadow: 4px 6px 9px#6b8a6b;
      background: #ffffff;
      &-header {
        font-size: 14px;
        svg {
          cursor: pointer;
          width: 48px;
          height: 24px;
        }
      }
      &-body {
        .todos {
          .todo {
            height: 50px;
            margin: 10px 0;
            padding: 0 10px;
            border-radius: 14px;
            border: 1px solid green;
            // background-color: red;
            > label {
              display: block;
              width: 100%;
              line-height: 50px;
              font-size: 16px;
              cursor: pointer;
              white-space: nowrap;
              overflow: hidden;
            }
            > input {
              width: 100%;
              font-size: 16px;
              font-family: inherit;
              font-weight: inherit;
              line-height: 50px;
              padding: 0;
              border: none;
              outline: none;
              background-color: transparent;
            }
          }
        }
      }
    }
  }
</style>
