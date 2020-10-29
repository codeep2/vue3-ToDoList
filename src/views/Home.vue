<template lang="pug">
div.sidebar
  TheSideBar
div.main
  div.header
    TheHeader
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
  }
})
</script>

<style lang="scss" scoped>
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
      font-size: 20px;
    }
  }
</style>
