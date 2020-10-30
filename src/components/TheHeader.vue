<template lang="pug">
div.header-wrap
  h1 {{ headerTitle }}
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    headerTitle: {
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>
  .header-wrap {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 8px 10px 10px;
    text-transform: capitalize;
    border-bottom: solid 3px #878787;

  }
</style>
