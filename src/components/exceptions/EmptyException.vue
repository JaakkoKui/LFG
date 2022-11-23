<template>
	<div id="empty-exception" class="bg-background-darker rounded-xl p-8 xl:p-16 relative">
		<div class="xl:absolute top-0 xl:h-full mb-4 flex">
			<div class="xl:h-fit mx-auto xl:my-auto">
				<h1 class="text-3xl sm:text-6xl font-semibold capitalize">Such empty...</h1>
				<h4 class="mt-1 italic font-semibold text-sm">Seems like there is nothing here...</h4>
			</div>
		</div>
		<div class="relative">
			<img
				class="w-full sm:w-1/2 xl:w-1/3 max-h-[300px] mx-auto"
				src="@/assets/images/ExceptionGraphics/empty.svg"
				alt="Empty layer0"
			/>
			<div class="w-full absolute flex justify-center top-0">
				<img
					class="w-full z-10 absolute top-0 sm:w-1/2 xl:w-1/3 max-h-[300px] mx-auto windbounce"
					src="@/assets/images/ExceptionGraphics/emptyl1.svg"
					alt="Empty layer1"
				/>
			</div>
			<div class="w-full absolute flex justify-center top-0">
				<img
					class="w-full z-10 absolute top-0 sm:w-1/2 xl:w-1/3 max-h-[300px] mx-auto windbounce2"
					src="@/assets/images/ExceptionGraphics/emptyl2.svg"
					alt="Empty layer2"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'EmptyException',
}
</script>

<style>
.windbounce {
	animation-name: windbounce;
	animation-duration: 4.5s;
	animation-timing-function: ease-in-out;
	animation-iteration-count: infinite;
}

.windbounce2 {
	animation-name: windbounce;
	animation-duration: 6.5s;
	animation-delay: 50ms;
	animation-timing-function: ease-in-out;
	animation-iteration-count: infinite;
}

@keyframes windbounce {
	0%,
	100% {
		transform: translate(0px, 10px);
	}
	50% {
		transform: translate(5px, 0px);
	}
}
</style>
