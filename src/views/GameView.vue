<template>
	<div class="justify-center sm:p-2.5 md:p-5 lg:p-10 2xl:p-20">
		<div v-if="!notFound" class="w-full 2xl:mx-auto 2xl:w-5/6 bg-lightBackground rounded-lg md:flex relative">
			<GameImageComponent />
			<!-- View game -->
			<GameContentComponent v-if="game && !isNew" :game="game" />
			<!-- New game -->
			<NewGameContentComponent v-if="isNew" />
		</div>
		<div v-else>
			<div class="text-white w-full text-center mt-5 md:mt-0 px-5">
				<h1 class="font-bold text-7xl md:text-9xl">Oops!</h1>
				<h2 class="mt-10 font-bold text-xl">The game you were looking for could not be found!</h2>

				<img
					class="object-contain 2/3 md:w-1/2 2xl:w-[700px] mx-auto mt-24"
					src="@/assets/images/ExceptionGraphics/404.svg"
					alt="404"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import GameImageComponent from '@/components/Game/GameImageComponent.vue'
import GameContentComponent from '@/components/Game/GameContentComponent.vue'
import NewGameContentComponent from '@/components/Game/NewGameContentComponent.vue'

export default {
	name: 'GameView',
	components: {
		GameContentComponent,
		GameImageComponent,
		NewGameContentComponent,
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
