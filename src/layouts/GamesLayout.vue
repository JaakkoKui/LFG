<template>
	<div class="flex flex-wrap px-2 sm:px-4 md:px-8 gap-4 bg-background-darker rounded-xl py-8">
		<!-- Game Card -->
		<GameCardComponent v-for="game in games" :key="game.gameId" :game="game" :profile-id="profileId" />

		<!-- New Game -->
		<!-- <NewGameCardHelper v-if="isOwner" :profile-id="profileId" /> -->
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
