<template lang="pug">
div.sidebar__wrap
  div.sidebar__user-info
    img(src="../assets/images/logo.png")
    p.user_name {{ userName }}
  div.sidebar__function-lists
    ul.functions
      li.function(
        v-for="fun in functions"
        :key="fun"
      ) {{ fun }}
  div.sidebar__configure
    p setting
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TheSideBar',
  data () {
    return {
      userName: 'Codeep'
    }
  },
  setup () {
    const functions = ref(['Schedule', 'To Do List', 'Statistics'])
    return {
      functions
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  &__user-info {
    img {
      width: 80px;
      height: 80px;
      margin: 20px;
    }
    p {
      font-size: 20px;
      color: #f7f7f7;
      text-align: center;
    }
  }
  &__function-lists {
    margin-bottom: 200px;
    .function {
      color: #a3afa7;
      margin: 20px 0;
      font-size: 24px;
      &:hover {
        cursor: pointer;
      }
      > span {
        &.active {
          color: #f7f7f7;
        }
      }
    }
  }
  &__configure {
    color: #a3afa7;
    font-size: 20px;
  }
}
</style>
