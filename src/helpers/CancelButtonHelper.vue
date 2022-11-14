<template>
	<button
		:id="name + '-button'"
		class="rounded-full py-2 px-5 w-fit text-white uppercase font-semibold subpixel-antialiased font-sm hover:drop-shadow-xl disabled:hover:drop-shadow-none disabled:text-gray-400 hover:text-gray-300 transition duration-200"
		@click="$emit('cancelButtonClick')"
	>
		cancel
	</button>
</template>

<script>
export default {
	name: 'CancelButtonHelper',
}
</script>
