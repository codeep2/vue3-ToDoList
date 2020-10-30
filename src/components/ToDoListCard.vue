<template lang="pug">
div.todolist__card
  div.todolist__card-header
    TheHeader(:headerTitle="title")
      SvgIcon(iconName="ellipsis")
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
            background-color: red;
            > input {
              width: 100%;
              padding: 1px 10px;
              font-size: 16px;
              font-family: inherit;
              font-weight: inherit;
              line-height: 50px;
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
