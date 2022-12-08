<template>
	<!-- Not Found -->
  <div class="text-white w-full text-center mt-5 md:mt-0 px-5">
		<h1 class="font-bold text-7xl md:text-9xl">{{$t('exceptions.notFound.title')}}</h1>
		<h2 class="mt-10 font-bold text-xl">{{$t('exceptions.notFound.description')}}</h2>

		<img
			class="object-contain 2/3 md:w-1/2 2xl:w-[700px] mx-auto mt-24"
			src="@/assets/images/ExceptionGraphics/404.svg"
			alt="404"
		/>
  </div>
</template>

<script>
export default {
	name: 'NotFound',
}
</script>

<style scoped></style>
