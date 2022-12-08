<template>
	<!-- Standard cancel button helper -->
	<button
		:id="'Cancel-button'"
		class="rounded-full py-2 px-4 w-fit text-white capitalize font-semibold subpixel-antialiased text-sm hover:drop-shadow-xl disabled:hover:drop-shadow-none disabled:text-gray-400 hover:text-gray-300 transition duration-200"
	>
		{{$t('buttons.cancel')}}
	</button>
</template>

<script>
export default {
	name: 'CancelButtonHelper',
}
</script>
