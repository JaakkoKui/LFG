<template>
	<div class="w-full mb-4">
		<div
			id="gameName"
			class="text-4xl font-bold p-8 text-center bg-gradient-to-r from-secondary to-secondaryVariant text-text-white rounded-xl mt-2 mx-2"
		>
			{{ game.gameName }}
		</div>
		<div class="flex my-4 p-8 lg:px-16 lg:py-8">
			<div class="font-bold capitalize w-full flex flex-col gap-y-2">
				<h4 class="my-auto">{{$t('game.nickname')}}</h4>
				<h4 v-if="game.hoursPlayed" class="my-auto">{{$t('game.hoursPlayed')}}</h4>
				<h4 v-if="game.rank" class="my-auto">{{$t('game.rank')}}</h4>
				<h4 v-if="game.server" class="my-auto">{{$t('game.server')}}</h4>
			</div>
			<div class="flex flex-col gap-y-2 w-fit">
				<span class="ml-auto px-4 py-0.5 bg-accent rounded-full text-text-lighter" id="nickname">{{
					game.nicknameInGame
				}}</span>
				<span
					v-if="game.hoursPlayed > 0"
					class="ml-auto px-4 py-0.5 bg-accent rounded-full text-text-lighter"
					id="hours"
					>{{ game.hoursPlayed }}</span
				>
				<span v-if="game.rank" class="ml-auto px-4 py-0.5 bg-accent rounded-full text-text-lighter" id="rank">{{
					game.rank
				}}</span>
				<span v-if="game.server" class="ml-auto px-4 py-0.5 bg-accent rounded-full text-text-lighter" id="server">{{
					game.server
				}}</span>
			</div>
		</div>

		<div v-if="game.comments" class="px-8 lg:px-16">
			<h4 class="font-bold capitalize">{{$t('game.comment')}}</h4>
			<p id="comments">{{ game.comments }}</p>
		</div>
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
