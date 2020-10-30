<template lang="pug">
div.sidebar
  TheSideBar
div.main
  div.header
    TheHeader(:headerTitle="$route.name")
      div.date(
        v-if="$route.name === 'todolist'"
      ) {{ date }}
  router-view
</template>>

<script lang="ts">
import { defineComponent } from 'vue'
import TheSideBar from '@/components/TheSidebar.vue'
import TheHeader from '@/components/TheHeader.vue'

export default defineComponent({
  name: 'Home',
  components: {
    TheSideBar,
    TheHeader
  },
  computed: {
    date () {
      const date = this.$route.params.date as string
      const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sta']

      const year = parseInt(date.slice(0, 4))
      const month = parseInt(date.slice(4, 6))
      const day = parseInt(date.slice(-2))
      const week = new Date(year, month - 1, day).getDay()

      return `${year}.${month}.${day}.${weeks[week]}`
    }
  }
})
</script>

<style lang="scss">
  .sidebar {
    flex: 0 0 240px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color: #084a46;
    width: 240px;
    height: 100%;
    padding: 20px 0 50px;
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 50px;
    background-color: #f4f4f4;
    .header {
      h1 {
        font-size: 32px;
      }
      .date {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>
