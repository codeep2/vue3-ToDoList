<template lang="pug">
div.todolist__card
  div.todolist__card-header
    TheHeader
  div.todolist__card-body
    ul.todos
      template(v-for="todo in todos")
        li.todo
          label(v-show="false")
          input
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/TheHeader.vue'

export default defineComponent({
  components: {
    TheHeader
  },
  data () {
    return {
      todos: [
        { content: 123 },
        { content: 456 },
        { content: 789 }
      ]
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
      background: #ffffff;
      &-header {
        font-size: 14px;
      }
      &-body {
        .todos {
          .todo {
            margin: 10px 0;
            padding: 0 10px;
            border-radius: 27px;
            border: 1px solid transparent;
            > input {
              width: 100%;
              padding: 0 10px;
              font-size: 16px;
              font-family: inherit;
              font-weight: inherit;
              line-height: 50px;
              border: none;
              outline: none;
              background-color: green;
            }
          }
        }
      }
    }
  }
</style>
