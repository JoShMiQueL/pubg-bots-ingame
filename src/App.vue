<template lang="pug">
Wrapper
  Header
  Body
</template>

<script>
import Header from './components/Header.vue'
import Wrapper from './components/Wrapper.vue'
import Body from './components/Body.vue'
export default {
  name: 'App',
  components: {
    Header,
    Wrapper,
    Body
  }
}
</script>

<style lang="scss">
</style>
