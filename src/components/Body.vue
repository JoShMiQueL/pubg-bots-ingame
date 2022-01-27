<template lang="pug">
.body
  span.version v1.0.0
  .result
    p.text-center(v-if="error") {{ error }}
    svg(v-if="!error && !isInfoLoaded && firstLoad" xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24')
      path(d='M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005l.001 5.995H5z' fill='currentColor')
      ellipse(cx='8.5' cy='12' rx='1.5' ry='2' fill='currentColor')
      ellipse(cx='15.5' cy='12' rx='1.5' ry='2' fill='currentColor')
      path(d='M8 16h8v2H8z' fill='currentColor')
    svg.animate-spin(v-if="!error && !isInfoLoaded && !firstLoad" xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24')
      path(d='M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005l.001 5.995H5z' fill='currentColor')
      ellipse(cx='8.5' cy='12' rx='1.5' ry='2' fill='currentColor')
      ellipse(cx='15.5' cy='12' rx='1.5' ry='2' fill='currentColor')
      path(d='M8 16h8v2H8z' fill='currentColor')
    p(v-if="!error && isInfoLoaded") {{ botsInLobby }}
  button.load-result(@click="load") Load Last Match
</template>
<script>
import { getConfig } from '../functions/getConfig'
import { ref } from 'vue'
// import { writeConfig } from '../functions/writeConfig'
import axios from 'axios'
// import { getConfig } from '../functions/getConfig'
// import fs from 'fs'
// import path from 'path'

export default {
  name: 'Body',
  setup () {
    const isInfoLoaded = ref(false)
    const firstLoad = ref(true)
    const botsInLobby = ref(null)
    const error = ref(null)
    async function requestLastMatch (playerName, apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyYTdhNjkwMC01YWY5LTAxM2EtZGRjMC0wYmUwNDRmZWI1Y2EiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjQyNTU3NDg1LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InFzcWIifQ.CwN8bLsiXPUiE3eR1rNFg_TSoztUlSs7Eht1sTn0-jQ') {
      let res
      try {
        res = await axios.get(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${playerName}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: 'application/vnd.api+json'
          }
        })
      } catch (e) {
        let errorMessage
        switch (e.response.status) {
          case 401:
            errorMessage = 'Invalid API key'
            break
          case 404:
            errorMessage = 'Player not found'
            break
          case 415:
            errorMessage = 'Content type incorrect or not specified'
            break
          case 429:
            errorMessage = 'Too many requests'
            break
          default:
            errorMessage = e
        }
        throw new Error(errorMessage)
      }
      const lastMatchId = res.data.data[0].relationships.matches.data[0].id
      const match = await axios.get(`https://api.pubg.com/shards/steam/matches/${lastMatchId}`, {
        headers: {
          Accept: 'application/vnd.api+json'
        }
      })
      return {
        bots: match.data.included.filter(player => player.attributes?.stats?.playerId?.startsWith('ai.')),
        players: match.data.included.filter(player => player.attributes?.stats?.playerId?.startsWith('account.'))
      }
    }
    /* function fakeRequest () {
      return new Promise(resolve => {
        setTimeout(() => {
          const info = {
            bots: Math.floor(Math.random() * (88 - 0) + 0)
          }
          resolve(info)
        }, Math.floor(Math.random() * (2500 - 500) + 500))
      })
    } */
    function blockRequestButton () {
      const button = document.querySelector('button.load-result')
      button.disabled = true
    }
    function unblockRequestButton () {
      const button = document.querySelector('button.load-result')
      button.disabled = false
    }
    async function load () {
      error.value = null
      isInfoLoaded.value = false
      firstLoad.value = false
      blockRequestButton()
      let bots = null
      try {
        bots = (await requestLastMatch(getConfig().playerName)).bots
      } catch (error) {
        this.error = error
      } finally {
        unblockRequestButton()
      }
      if (bots) {
        botsInLobby.value = bots.length
      }
      isInfoLoaded.value = true
    }
    return {
      getConfig,
      isInfoLoaded,
      firstLoad,
      botsInLobby,
      error,
      load
    }
  }
}
</script>
<style lang="scss">
@import '../assets/_variables.scss';
.body {
  @apply text-white;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    margin: 0 0 0 -1rem;
    @apply my-2;
    @apply bg-transparent;
  }
  &::-webkit-scrollbar-thumb {
    @apply bg-gray-800;
  }
  @apply flex;
  @apply flex-col;
  @apply p-2;
  @apply py-1;
  @apply overflow-y-auto;
  height: calc(100vh - #{$header-height});
  @apply bg-app-primary;
}
.result {
  & > svg {
    width: 24px;
    height: 24px;
  }
  @apply flex;
  @apply justify-center;
  @apply items-center;
  @apply h-full;
}
button.load-result {
  @apply bg-app-btn-primary;
  @apply font-bold;
  min-height: 20px;
  @apply uppercase;
  font-size: 10px;
  margin-bottom: 6px;
  &:hover {
    @apply bg-app-btn-primary-hover;
  }
  &:active {
    @apply bg-app-btn-primary-active;
  }
  &:disabled {
    @apply bg-gray-500;
    @apply cursor-not-allowed;
  }
}
.version {
  @apply absolute;
  @apply opacity-30;
  font-size: 9px;
}
</style>
