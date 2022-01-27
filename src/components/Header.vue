<template lang="pug">
.header
  .header__draggable-section
    | PUBG Bots Checker
  .header__control-section
    button.minimize(@click="minimizeWindow")
      svg(xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='0 0 16 16')
        g(fill='currentColor')
          path(d='M5 8h6v1H5z')
    button.close(@click="closeWindow")
      svg(xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24')
        path(d='M16.192 6.344l-4.243 4.242l-4.242-4.242l-1.414 1.414L10.535 12l-4.242 4.242l1.414 1.414l4.242-4.242l4.243 4.242l1.414-1.414L13.364 12l4.242-4.242z' fill='currentColor')
</template>
<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Header',
  setup () {
    function minimizeWindow () {
      ipcRenderer.send('minimizeApp')
    }

    function closeWindow () {
      ipcRenderer.send('closeApp')
    }

    return {
      minimizeWindow,
      closeWindow
    }
  }
}
</script>
<style lang="scss">
@import '../assets/_variables.scss';
.header {
  @apply bg-app-primary;
  @apply text-white;
  @apply filter;
  @apply drop-shadow-md;
  @apply flex;
  height: $header-height;
  -webkit-app-region: drag;
  &__draggable-section {
    @apply flex;
    @apply items-center;
    @apply px-2;
    font-size: 12px;
  }
  &__control-section {
    -webkit-app-region: no-drag;
    @apply ml-auto;
    & > button {
      @apply h-full;
      width: $header-height;
      &.minimize {
        @apply bg-gray-800;
        &:hover {
          @apply bg-gray-700;
        }
        &:active {
          @apply bg-gray-900;
        }
      }
      &.close {
        @apply bg-red-500;
        &:hover {
          @apply bg-red-400;
        }
        &:active {
          @apply bg-red-600;
        }
      }
    }
  }
}
</style>
