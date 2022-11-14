<template>
	<div
		class="ring-4 rounded-lg ring-darkBackground flex flex-col h-96 w-60 mx-2 relative text-white bg-darkBackground transition ease-in-out hover:scale-105 duration-200 hover:bg-primary hover:ring-primary"
	>
		<router-link
			:to="'/profile/' + profileId + '/games/new'"
			class="rounded-lg w-full h-full font-bold text-7xl bg-darkBackground text-white hover:bg-primary flex justify-center"
			><span class="my-auto block h-fit">+</span></router-link
		>
	</div>
</template>

<script>
export default {
	name: 'NewGameCardHelper',

	props: {
		profileId: String,
	},
}
</script>
