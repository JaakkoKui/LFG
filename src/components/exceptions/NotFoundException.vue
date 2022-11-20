<template>
	<div>
		<div class="text-white w-full text-center mt-5 md:mt-0 px-5">
			<h1 class="font-bold text-7xl md:text-9xl">Oops!</h1>
			<h2 class="mt-10 font-bold text-xl">The game you were looking for could not be found!</h2>

			<img
				class="object-contain 2/3 md:w-1/2 2xl:w-[700px] mx-auto mt-24"
				src="@/assets/images/ExceptionGraphics/404.svg"
				alt="404"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NotFound',
}
</script>

<style scoped></style>
