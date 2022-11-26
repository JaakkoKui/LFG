<template>
	<router-link
		id="link"
		:to="'/profile/' + profileId + '/game/' + game.gameId"
		class="rounded-xl aspect-[1.4142] w-full sm:min-w-[200px] sm:max-w-[300px] border-x-4 border-t-4 border-background-default bg-background-default hover:scale-105 transition duration-200 ease-out"
	>
		<!-- Game card image -->
		<img :alt="game.gameName" class="object-contain rounded-xl w-full" src="@/assets/images/DemoCovers/Hades.png" id="gameImage"/>

		<!-- Game card info-body -->
		<div class="px-8 py-4 flex">
			<h1 class="text-lg font-semibold text-center" id="gameName">
				{{ game.gameName }}
			</h1>
			<h2 class="italic font-semibold text-center opacity-75 block h-fit my-auto ml-auto" id="hoursPlayed">
				{{ game.hoursPlayed }} Hours
			</h2>
		</div>
	</router-link>
</template>

<script>
export default {
	name: 'GameComponent',

	props: {
		game: {},
		profileId: String,
	},
}
</script>
