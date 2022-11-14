<template>
	<div class="px-10 pb-10 pt-8 bg-white text-gray-600 overflow-x-auto">
		<!-- Header -->
		<div class="absolute font-bold mb-10 border-b-4 border-gray-300 text-3xl w-[calc(100%-80px)]">
			<h1 class="bg-white pr-5 -mb-4 w-fit">Games</h1>
		</div>

		<!-- Games -->
		<div class="flex w-fit mt-[60px]">
			<!-- Game Card -->
			<GameCardComponent v-for="game in games" :key="game.gameId" :game="game" :profile-id="profileId" />

			<!-- New Game -->
			<NewGameCardHelper v-if="isOwner" :profile-id="profileId" />
		</div>
	</div>
</template>

<script>
import GameCardComponent from '@/components/profile/GameCardComponent.vue'
import NewGameCardHelper from '@/helpers/NewGameCardHelper.vue'

export default {
	name: 'GamesLayout',

	components: {
		GameCardComponent,
		NewGameCardHelper,
	},

	props: {
		games: Array,
		profileId: String,
	},

	data() {
		return {
			isOwner: true,
		}
	},
}
</script>
