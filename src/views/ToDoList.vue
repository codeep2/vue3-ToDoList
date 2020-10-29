<template lang="pug">
div.todolist
  toDoListCard(
    v-for="title in titles"
  )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import toDoListCard from '@/components/ToDoListCard.vue'

export default defineComponent({
  components: {
    toDoListCard
  },
  data () {
    return {
      titles: ['DO', 'DONE', 'MEMO', 'OTHER']
    }
  }
})
</script>

<style lang="scss" scoped>
  .todolist {
    display: flex;
    padding: 50px 20px 0;
  }
</style>
