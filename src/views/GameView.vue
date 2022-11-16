<template>
	<div v-if="!notFound" class="p-2 sm:p-4 lg:p-8 max-h-[calc(100vh-65px)] flex justify-center">
		<div class="md:flex h-fit md:h-full min-h-full gap-x-2">
			<div class="w-fit h-fit border border-background-darker max-w-1/2 bg-background-darker rounded-xl">
				<GameImageComponent />
			</div>
			<div class="flex flex-col bg-background-darker rounded-xl my-2 md:mb-0 md:mt-0 sm:min-w-[300px] lg:min-w-[500px]">
				<!-- View game -->
				<GameContentComponent v-if="game && !isNew" :game="game" />
				<!-- <NewGameContentComponent v-if="isNew" /> -->

				<div class="w-full p-2 mt-auto">
					<button
						class="w-full relative flex justify-center py-16 rounded-xl text-2xl font-semibold transition duration-300 ease-out text-text-white overflow-clip"
					>
						<img
							class="absolute -top-[10%] transition duration-500 ease-out hover:scale-125 z-0 rounded-xl"
							src="@/assets/images/game.jpeg"
							alt="communit-background"
						/>
						<span class="z-10 pointer-events-none">Go to the Community</span>
						<span class="material-symbols-outlined font-bold ml-2 mt-1.5 z-10 pointer-events-none">arrow_forward</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import GameImageComponent from '@/components/game/GameImageComponent.vue'
import GameContentComponent from '@/components/game/GameContentComponent.vue'

export default {
	name: 'GameView',
	components: {
		GameContentComponent,
		GameImageComponent,
	},

	data() {
		return {
			isNew: false,
			notFound: false,
			game: null,
		}
	},

	methods: {
		getGame(id) {
			if (id) {
				axios
					.get('https://localhost:5001/api/Game/' + id)
					.then((response) => {
						this.game = response.data
					})
					.catch((error) => {
						this.notFound = true
						console.log(error)
					})
			}
		},
	},

	mounted() {
		const gameId = this.$route.params.gameId
		if (gameId === 'new') {
			this.isNew = true
		} else {
			this.getGame(gameId)
		}
	},
}
</script>
