<template>
	<router-link
		v-if="game"
		id="link"
		:to="'/profile/' + profileId + '/game/' + game.gameId"
		class="rounded-xl aspect-square w-full sm:min-w-[200px] sm:max-w-[300px] border-x-4 border-t-4 border-background-default bg-background-default hover:scale-105 transition duration-200 ease-out"
	>
		<!-- Game card image -->
		<img
			v-if="gameExternal"
			:alt="game.gameName"
			class="object-cover rounded-xl h-full w-full"
			:src="gameExternal.background_image"
			id="gameImage"
		/>
		<div v-else class="object-cover rounded-xl h-full w-full bg-background-lighter animate-pulse">
		</div>

		<!-- Game card info-body -->
		<div class="px-8 py-4 flex">
			<h1 class="text-lg font-semibold text-center" id="gameName">
				{{ game.gameName }}
			</h1>
			<h2 class="italic font-semibold text-center opacity-75 block h-fit my-auto ml-auto" id="hoursPlayed">
				{{ game.hoursPlayed }} {{ $t('game.hours') }}
			</h2>
		</div>
	</router-link>
</template>

<script>
import axios from "axios";

export default {
	name: 'GameComponent',

	//Props passed from parent to render
	props: {
		game: Object,
		profileId: String,
	},

	data(){
	  return {
			gameExternal: null
		}
	},

	methods: {
		async getGameExternal() {
			if (this.game) {
				console.log('/api/Game/GetExternal/' + this.game.gameName)
				axios
					.get('/api/Game/GetExternal/' + this.game.gameName)
					.then((response) => {
						this.gameExternal = response.data
					})
					.catch((e) => {
						console.log(e)
					})
			}
		},
	},

	mounted() {
	  this.getGameExternal()
  },

  watch: {
	  game(){
			if(this.game){
			  this.getGameExternal()
			}
		}
	}
}
</script>
