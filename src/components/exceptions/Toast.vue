<template>
	<Teleport to="body">
		<!-- Info toast -->
		<div class="w-full flex justify-center fixed bottom-8">
			<article class="max-sm:mx-2 text-text-default max-sm:block sm:w-[350px] p-4 flex justify-between rounded-lg bg-background-lighter text-semibold z-auto">
				<p class="my-auto">{{text}}</p>
				<button class="my-auto text-text-white opacity-75 hover:opacity-100 transition duration-200" @click="$emit('close')">
					{{$t('buttons.close')}}
				</button>
			</article>
		</div>
	</Teleport>
</template>

<script>
export default {
  name: "Toast",
  props: {
		text: String
	}
}
</script>

<style scoped>

</style>
