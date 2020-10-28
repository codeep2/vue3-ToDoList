<template lang="pug">
div.header-wrap
  h1 {{ $route.name }}
  slot
</template>

<style lang="scss" scoped>
  .header-wrap {
    display: flex;
    font-size: 20px;
    padding: 0 0 10px 10px;
    text-transform: capitalize;
    border-bottom: solid 3px #878787;
  }
</style>
