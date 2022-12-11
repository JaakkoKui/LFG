<template>
	<div class="mb-4">

		<!-- Game title -->
		<div
			id="gameName"
			class="text-4xl font-bold p-8 text-center text-text-white rounded-xl mt-2 mx-2 transition duration-200"
			:class="classObject"
		>
			{{ game.gameName }}
		</div>

		<!-- Game info body -->
		<div class="flex my-4 p-8 lg:px-16 lg:py-8">
			<div class="font-bold capitalize w-full flex flex-col gap-y-2">
				<h4 class="my-auto">{{ $t('game.nickname') }}</h4>
				<h4 v-if="game.hoursPlayed" class="my-auto">{{ $t('game.hoursPlayed') }}</h4>
				<h4 v-if="game.rank" class="my-auto">{{ $t('game.rank') }}</h4>
				<h4 v-if="game.server" class="my-auto">{{ $t('game.server') }}</h4>
			</div>
			<div class="flex flex-col gap-y-2 w-fit text-center">
				<p class="ml-auto px-4 py-0.5 bg-accent rounded-full text-text-lighter" style="display: inline-block; word-break: keep-all; white-space: nowrap" id="nickname">{{
						game.nicknameInGame
					}}</p>
				<p
					v-if="game.hoursPlayed > 0"
					class="ml-auto px-4 py-0.5 bg-accent rounded-full text-text-lighter"
					id="hours"
				>{{ game.hoursPlayed }}</p
				>
				<p v-if="game.rank" style="display: inline-block; word-break: keep-all; white-space: nowrap" class="ml-auto px-4 py-0.5 bg-accent rounded-full text-text-lighter break-keep" id="rank">{{
						game.rank
					}}</p>
				<p v-if="game.server" style="display: inline-block; word-break: keep-all; white-space: nowrap" class="ml-auto px-4 py-0.5 bg-accent rounded-full text-text-lighter" id="server">{{
						game.server
					}}</p>
			</div>
		</div>

		<!-- Game comment -->
		<div v-if="game.comments" class="px-8 lg:px-16">
			<h4 class="font-bold capitalize">{{ $t('game.comment') }}</h4>
			<p id="comments" style="display: inline-block; word-break: break-word">{{ game.comments }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GameContentComponent',

	//Get game object from parent for render and get external game data
	props: {
		game: Object,
		gameExternal: Object,
	},

	//Change title background color to the dominant color of the game if one exists.
	computed: {
		classObject() {
			if (this.gameExternal) {
				return 'bg-[#' + this.gameExternal.dominant_color + ']'
			} else {
				return 'bg-secondary'
			}
		}
	}
}
</script>
