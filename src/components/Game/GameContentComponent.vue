<template>
	<div class="w-full h-full p-10 xl:px-20">
		<h1 class="text-5xl font-bold border-b-2 pb-5">{{ game.gameName }}</h1>
		<div class="flex my-5">
			<div class="font-bold capitalize mr-5">
				<h4>Nickname In-game</h4>
				<h4>Hours played</h4>
				<h4>Rank</h4>
				<h4>Server</h4>
			</div>
			<div>
				<p>{{ game.nicknameInGame }}</p>
				<p>{{ game.hoursPlayed }}</p>
				<p>{{ game.rank }}</p>
				<p>{{ game.server }}</p>
			</div>
		</div>
		<h4 class="font-bold">Comment</h4>
		<p>{{ game.comments }}</p>
	</div>
</template>

<script>
export default {
	name: 'GameContentComponent',

	props: {
		game: Object,
	},
}
</script>
