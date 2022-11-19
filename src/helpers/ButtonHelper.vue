<template>
	<button
		:id="name + '-button'"
		class="rounded-full bg-primary py-2 px-4 w-fit text-text-white capitalize font-semibold disabled:text-text-darker disabled:bg-background-lighter hover:bg-primaryVariant transition ease-out duration-200"
	>
		{{ name }}
	</button>
</template>

<script>
export default {
	name: 'ButtonSubComponent',

	props: {
		name: String,
	},
}
</script>
