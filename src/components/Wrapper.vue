<template lang="pug">
#wrapper
  slot
</template>
<script>
export default {
  name: 'Wrapper'
}
</script>
<style lang="scss">
#wrapper {
  @apply h-screen;
  font-family: 'Open Sans', sans-serif;
}
</style>
