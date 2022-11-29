<template>
	<div v-if="!notFound" class="p-2 sm:p-4 lg:p-8 max-h-[calc(100vh-65px)] flex justify-center relative">
		<div class="md:flex h-fit md:h-full min-h-full gap-x-2">
			<div class="w-fit h-fit border border-background-darker max-w-1/2 bg-background-darker rounded-xl">
				<GameImageComponent @cancel="deleteConfirm = false" @deleteGame="deleteGame" :delete-confirm="deleteConfirm" />
			</div>
			<div class="flex flex-col bg-background-darker rounded-xl my-2 md:mb-0 md:mt-0 sm:min-w-[300px] lg:min-w-[500px]">
				<!-- View game -->
				<GameContentComponent v-if="game && !isNew && !isEditing" :game="game" />
				<NewGameContentComponent v-if="isNew" />
				<EditGameContentComponent v-if="isEditing" @updateGame="getGame" :game="game" @cancel="isEditing = false" />

				<div v-if="!isNew && !isEditing" class="w-full p-2 mt-auto">
					<button
						class="w-full relative flex justify-center py-16 rounded-xl text-2xl font-semibold transition duration-300 ease-out text-text-white overflow-clip"
					>
						<img
							class="absolute -top-[10%] object-cover transition duration-500 ease-out hover:scale-125 z-0 rounded-xl"
							src="@/assets/images/game.jpeg"
							alt="communit-background"
						/>
						<span class="z-10 pointer-events-none">Go to the Community</span>
						<span class="material-symbols-outlined font-bold ml-2 mt-1.5 z-10 pointer-events-none">arrow_forward</span>
					</button>

					<div class="flex mt-2 p-2 bg-background-default rounded-xl">
						<div class="w-fit mx-auto gap-2 flex">
							<button
								@click="deleteConfirm = !deleteConfirm"
								class="p-4 bg-red-500 rounded-xl material-symbols-outlined font-bold transition duration-150 hover:scale-110 hover:bg-red-600"
							>
								delete
							</button>
							<button
								@click="isEditing = true"
								class="p-4 bg-sky-700 rounded-xl material-symbols-outlined font-bold transition duration-150 hover:scale-110 hover:bg-sky-800"
							>
								edit
							</button>
							<button
								class="p-4 bg-primary rounded-xl material-symbols-outlined font-bold transition duration-150 hover:scale-110 hover:bg-primaryVariant"
							>
								Link
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import GameImageComponent from '@/components/game/GameImageComponent.vue'
import GameContentComponent from '@/components/game/GameContentComponent.vue'
import NewGameContentComponent from '../components/game/NewGameContentComponent.vue'
import EditGameContentComponent from '../components/game/EditGameContentComponent.vue'
import router from '../router'

export default {
	name: 'GameView',
	components: {
		GameContentComponent,
		GameImageComponent,
		NewGameContentComponent,
		EditGameContentComponent,
	},

	data() {
		return {
			isNew: false,
			isEditing: false,
			notFound: false,
			game: null,

			deleteConfirm: false,
		}
	},

	methods: {
		async getGame() {
			axios
				.get('/api/Game/' + this.$route.params.gameId)
				.then((response) => {
					this.game = response.data
				})
				.catch((error) => {
					this.notFound = true
					console.log(error)
				})
		},

		async deleteGame() {
			axios
				.delete('/api/Game/' + this.$route.params.gameId)
				.then(() => {
					router.push('/profile/' + this.$route.params.profileId)
				})
				.catch((error) => {
					console.log(error)
				})
		},
	},

	created() {
		if (this.$route.params.gameId === 'new') {
			this.isNew = true
		} else {
			this.getGame()
		}
	},
}
</script>
