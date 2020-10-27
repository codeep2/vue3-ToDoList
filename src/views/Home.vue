<template lang="pug">
nav
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
