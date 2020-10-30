<template lang="pug">
svg.svg_icon
  use(:xlink:href="`#${iconName}`")
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconName: {
      type: String,
      required: true
    }
  }
}
</script>
