<template>
	<header
		class="bg-gradient-to-r from-blue-400 to-fuchsia-800 sm:via-violet-800 sm:to-fuchsia-800 m-2 rounded-xl py-16 text-center text-text-white"
	>
		<h1 class="text-6xl font-semibold">{{ $t("about.header.title") }}</h1>
		<p class="font-semibold text-sm mt-2 italic">{{ $t("about.header.description") }}</p>
	</header>
	<article class="p-8">
		<div class="flex text-center flex-wrap gap-y-4">
			<div class="h-[600px] w-1/2 pr-2">
				<div class="bg-background-darker rounded-xl p-8 h-full">
					<h2 class="mb-4 font-semibold text-3xl">Looking For Group!</h2>
					<p>Lorem ipsum</p>
				</div>
			</div>
			<div class="h-[600px] w-1/2 pl-2">
				<div class="bg-background-darker rounded-xl h-full">
					<img src="src/assets/images/Game.jpeg" class="object-cover w-full h-full rounded-xl" alt="game" />
				</div>
			</div>

			<div class="h-[600px] w-1/3 pr-2">
				<div class="bg-background-darker rounded-xl h-full">
					<img src="src/assets/images/Game.jpeg" class="object-cover w-full h-full rounded-xl" alt="game" />
				</div>
			</div>
			<div class="h-[600px] w-2/3 pl-2">
				<div class="bg-background-darker rounded-xl p-8 h-full">
					<h2 class="mb-4 font-semibold text-3xl">Let's F**kin Go!</h2>
					<p>Lorem ipsum</p>
				</div>
			</div>

			<div class="h-[600px] w-1/2 pr-2">
				<div class="bg-background-darker rounded-xl p-8 h-full">
					<h2 class="mb-4 font-semibold text-3xl">LFG</h2>
					<p>Lorem ipsum</p>
				</div>
			</div>
			<div class="h-[600px] w-1/2 pl-2">
				<div class="bg-background-darker rounded-xl h-full">
					<img src="src/assets/images/Game.jpeg" class="object-cover w-full h-full rounded-xl" alt="game" />
				</div>
			</div>
		</div>
	</article>
	<footer class="h-96 w-full bg-background-lighter"></footer>
</template>
