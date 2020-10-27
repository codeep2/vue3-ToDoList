<template lang="pug">
div.sidebar
  TheSideBar
main
</template>>

<script lang="ts">
import { defineComponent } from 'vue'
import TheSideBar from '@/components/TheSidebar.vue'

export default defineComponent({
  name: 'Home',
  components: {
    TheSideBar
  }
})
</script>

<style lang="scss" scoped>
  .sidebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color: #084a46;
    width: 240px;
    height: 100%;
    padding: 20px 0 50px;
  }
</style>
