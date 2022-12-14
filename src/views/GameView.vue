<template>
	<!-- Game view -->
	<div v-if="!notFound"
			 class="p-2 sm:p-4 lg:p-8 max-h-[calc(100vh-65px)] w-full flex relative aspect-[2/1] min-h-[850px]">
		<div class="lg:flex h-fit md:h-full w-full min-h-full gap-x-2">
			<!-- View game image -->
			<transition name="slide-fade" appear>
				<div class="border w-full border-background-darker bg-background-darker rounded-xl">
					<GameImageComponent @cancel="deleteConfirm = false" @deleteGame="deleteGame" :delete-confirm="deleteConfirm"
															:uri="computedUri" :score="computedScore"/>
				</div>
			</transition>

			<!-- View game content -->
			<transition name="fade" appear>
				<div class="flex flex-col bg-background-darker rounded-xl my-2 md:mb-0 md:mt-0 sm:min-w-[300px] lg:w-[500px]">
					<GameContentComponent v-if="game && !isNew && !isEditing" :gameExternal="gameExternal" :game="game"/>
					<NewGameContentComponent v-if="isNew"/>
					<EditGameContentComponent v-if="isEditing" @updateGame="getGame" :game="game" @cancel="isEditing = false"/>

					<div v-if="!isNew && !isEditing" class="w-full p-2 mt-auto">
						<button
							v-if="gameExternal"
							class="w-full relative flex justify-center py-16 rounded-xl text-2xl font-semibold transition duration-300 ease-out text-text-white overflow-clip"
						>
							<img
								class="absolute -top-[10%] object-cover transition duration-500 ease-out hover:scale-125 z-0 rounded-xl blur"
								:src="gameExternal.background_image_additional"
								alt="communit-background"
							/>
							<span class="z-10 pointer-events-none">{{ $t('game.toCommunity') }}</span>
							<span
								class="material-symbols-outlined font-bold ml-2 mt-1.5 z-10 pointer-events-none">arrow_forward</span>
						</button>

						<div v-if="isOwner" id="gameControls" class="flex mt-2 p-2 bg-background-default rounded-xl">
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
			</transition>
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
import {useMeStore} from "@/stores/me";

export default {
	name: 'GameView',
	components: {
		GameContentComponent,
		GameImageComponent,
		NewGameContentComponent,
		EditGameContentComponent,
	},

	//Setup Pinia storage
	setup() {
		const meStore = useMeStore()
		return {meStore}
	},

	data() {
		return {
			isNew: false,
			isEditing: false,
			notFound: false,
			game: null,
			gameExternal: null,

			deleteConfirm: false,
		}
	},

	computed: {
		//Check ownership from pinia
		isOwner() {
			if (this.meStore.$state.profileId) {
				return this.meStore.$state.profileId === this.$route.params.profileId
			}
		},

		computedUri() {
			if (this.gameExternal) {
				return this.gameExternal.background_image
			}
		},

		computedScore() {
			if (this.gameExternal) {
				return this.gameExternal.metacritic
			}
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

	watch: {
		game() {
			if (this.game) {
				this.getGameExternal()
			}
		}
	}
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
  transition-delay: 0.5s;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
