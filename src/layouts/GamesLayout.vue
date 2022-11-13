<template>
  <div class="px-10 pb-10 pt-8 bg-white text-gray-600 overflow-x-auto">
    <div
      class="absolute font-bold mb-10 border-b-4 border-gray-300 text-3xl w-[calc(100%-80px)]"
    >
      <h1 class="bg-white pr-5 -mb-4 w-fit">Games</h1>
    </div>
    <div class="flex w-fit mt-[60px]">
      <GameCardComponent
        v-for="game in games"
        :key="game.gameId"
        :game="game"
        :nickname="profile.nickname"
      />
      <div
        v-if="isOwner"
        class="ring-4 rounded-lg ring-darkBackground flex flex-col h-96 w-60 mx-2 relative text-white bg-darkBackground transition ease-in-out hover:scale-105 duration-200 hover:bg-primary hover:ring-primary"
      >
        <router-link
          :to="'/profile/' + profile.nickname + '/games/new'"
          class="rounded-lg w-full h-full font-bold text-7xl bg-darkBackground text-white hover:bg-primary flex justify-center"
          ><span class="my-auto block h-fit">+</span></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import GameCardComponent from '@/components/profile/GameCardComponent.vue'

export default {
  name: 'GamesLayout',

  components: {
    GameCardComponent
  },

  props: {
    games: []
  },

  data() {
    return {
      isOwner: true,
      profile: {}
    }
  }
}
</script>
