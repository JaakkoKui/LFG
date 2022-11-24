<template>
	<div class="aspect-[1.4142] inline relative">
		<img
			class="object-contain rounded-xl h-full max-h-full"
			:class="{ blur: deleteConfirm }"
			src="@/assets/images/DemoCovers/Path Of Exile.png"
			alt="Game"
		/>

		<div v-if="deleteConfirm" class="absolute w-full h-full left-0 max-sm:p-8 top-0 flex">
			<div class="m-auto w-fit h-fit">
				<p class="italic font-semibold max-sm:text-center">
					Are you sure you want to delete this game from your profile permanently?
				</p>
				<div class="flex max-sm:mx-auto max-sm:w-fit max-sm:flex-col gap-x-4">
					<button
						@click="$emit('cancel')"
						class="rounded-xl px-8 py-2 font-semibold sm:w-1/2 mt-2 sm:mt-4 hover:text-text-lighter max-sm:order-2"
					>
						Cancel
					</button>
					<button
						@click="$emit('deleteGame')"
						class="bg-red-500 rounded-xl px-8 py-2 font-semibold sm:w-1/2 mt-4 hover:bg-red-600 transition hover:scale-110 duration-200 ease-out"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GameImageComponent',
	props: {
		deleteConfirm: Boolean,
	},
}
</script>
