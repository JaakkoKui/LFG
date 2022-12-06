<template>
	<!-- Game image component -->
	<div class="block relative h-full">
		<!-- Image -->
		<img
			v-if="uri"
			class="rounded-xl h-full object-cover"
			:class="{ blur: deleteConfirm }"
			:src="uri"
			alt="Game"
		/>

		<!-- If no image or empty -->
		<div v-else class="block min-w-[700px] w-full h-[600px]"></div>

		<!-- Metacritic score -->
		<div v-if="score" class="absolute right-4 bottom-4 bg-primary rounded-lg py-4 px-8 font-semibold">{{score}}</div>

		<!-- Game delete confirmation -->
		<div v-if="deleteConfirm" class="absolute w-full h-full left-0 max-sm:p-8 top-0 flex">
			<div class="m-auto w-fit h-fit">
				<p class="italic font-semibold max-sm:text-center">
					{{ $t('game.deleteConfirmation') }}
				</p>
				<div class="flex max-sm:mx-auto max-sm:w-fit max-sm:flex-col gap-x-4">
					<button
						@click="$emit('cancel')"
						class="rounded-xl px-8 py-2 font-semibold sm:w-1/2 mt-2 sm:mt-4 hover:text-text-lighter max-sm:order-2"
					>
						{{ $t('buttons.cancel') }}
					</button>
					<button
						@click="$emit('deleteGame')"
						class="bg-red-500 rounded-xl px-8 py-2 font-semibold sm:w-1/2 mt-4 hover:bg-red-600 transition hover:scale-110 duration-200 ease-out"
					>
						{{ $t('buttons.delete') }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GameImageComponent',

	//Props from parent to confirm delete, image uri from external API and metacritic score
	props: {
		deleteConfirm: Boolean,
		uri: String,
		score: String,
	},
}
</script>
