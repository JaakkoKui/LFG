<template>
	<div
		v-if="games.length > 0"
		class="flex flex-wrap px-2 sm:px-4 md:px-8 gap-4 bg-background-darker rounded-xl py-8 w-full max-w-[1600px] mx-auto"
	>
		<!-- Game Card -->
		<GameCardComponent v-for="game in games" :key="game.gameId" :game="game" :profile-id="profileId" />
	</div>
	<EmptyException v-else />
</template>

<script>
import GameCardComponent from '@/components/profile/GameCardComponent.vue'
import EmptyException from '@/components/exceptions/EmptyException.vue'

export default {
	name: 'GamesLayout',

	components: {
		GameCardComponent,
		EmptyException,
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
