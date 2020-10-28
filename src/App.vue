<template lang="pug">
div.container
  Home
</template>

<script lang="ts">
import '@/assets/scss/reset.scss'
import { defineComponent } from 'vue'
import Home from '@/views/Home.vue'

export default defineComponent({
  name: 'App',
  components: {
    Home
  }
})
</script>>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  display: flex;
  align-items: flex-start;
  height: 100vh;
}
</style>
