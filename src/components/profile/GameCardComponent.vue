<template>
	<div
		class="ring-4 rounded-lg ring-darkBackground flex flex-col h-96 w-60 mx-2 relative text-white bg-darkBackground transition ease-in-out hover:scale-105 duration-200 hover:bg-primary"
	>
		<router-link :to="'/profile/' + profileId + '/games/' + game.gameName">
			<!-- Game card image -->
			<img :alt="game.gameName" class="object-contain rounded-t-lg" src="@/assets/images/DemoCovers/Foxhole.png" />

			<!-- Game card info-body -->
			<div
				class="pb-2 h-[140px] w-full absolute bottom-0 bg-gradient-to-t from-darkBackground via-darkBackground rounded-b-lg"
			>
				<div class="mt-auto absolute bottom-0 w-[90%] mx-[5%] mb-2">
					<h1 class="text-xl font-semibold border-b pb-1 text-center">
						{{ game.gameName }}
					</h1>
					<h2 class="text-lg italic font-semibold text-center">{{ game.hoursPlayed }} Hours</h2>
				</div>
			</div>
		</router-link>
	</div>
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
