<template>
	<Transition name="fade" appear>
		<div>
			<header
				class="bg-gradient-to-r from-blue-400 to-fuchsia-800 sm:via-violet-800 sm:to-fuchsia-800 m-2 rounded-xl py-16 text-center text-text-white"
			>
				<h1 class="text-6xl font-semibold">{{ $t("about.header.title") }}</h1>
				<p class="font-semibold text-sm mt-2 italic">{{ $t("about.header.description") }}</p>
			</header>
			<article class="p-8">
				<div class="flex max-lg:flex-row text-center flex-wrap gap-y-4">
					<div class="h-[600px] max-lg:w-full lg:w-1/2 lg:pr-2 max-lg:order-2">
						<div class="bg-background-darker rounded-xl p-8 h-full">
							<h2 class="mb-4 font-semibold text-3xl">{{ $t('about.vision.title') }}</h2>
							<p class="mt-16">{{ $t('about.vision.content') }}</p>
						</div>
					</div>
					<div class="h-[600px] max-lg:w-full lg:w-1/2 lg:pl-2 max-lg:order-1">
						<div class="bg-white rounded-xl h-full">
							<img src="@/assets/images/About/Team.png" class="object-contain w-full h-full rounded-xl" alt="game"/>
						</div>
					</div>

					<div class="h-[600px] max-lg:w-full lg:w-1/3 lg:pr-2 max-lg:order-4">
						<div class="bg-white rounded-xl h-full">
							<img src="@/assets/images/About/Game.png" class="object-contain w-full h-full rounded-xl" alt="game"/>
						</div>
					</div>
					<div class="h-[600px] max-lg:w-full lg:w-2/3 lg:pl-2 max-lg:order-3">
						<div class="bg-background-darker rounded-xl p-8 h-full">
							<h2 class="mb-4 font-semibold text-3xl">{{ $t('about.features.title') }}</h2>
							<div class="text-left mt-16">
								<h4 class="font-semibold mb-2 text-xl">{{ $t('about.features.subtitle') }}</h4>
								<ul class="list-disc list-inside">
									<li>{{ $t('about.features.content.l1') }}</li>
									<li>{{ $t('about.features.content.l2') }}</li>
									<li>{{ $t('about.features.content.l3') }}</li>
									<li>{{ $t('about.features.content.l4') }}</li>
									<li>{{ $t('about.features.content.l5') }}</li>
									<li>{{ $t('about.features.content.l6') }}</li>
									<li>{{ $t('about.features.content.l7') }}</li>
								</ul>
							</div>
						</div>
					</div>

					<div class="h-[600px] max-lg:w-full lg:w-1/2 lg:pr-2">
						<div class="bg-background-darker rounded-xl p-8 h-full">
							<h2 class="mb-4 font-semibold text-3xl">{{ $t('about.future.title') }}</h2>
							<div class="text-left mt-16">
								<h4 class="font-semibold mb-2 text-xl">{{ $t('about.future.subtitle') }}</h4>
								<ul class="list-disc list-inside">
									<li>{{ $t('about.future.content.l1') }}</li>
									<li>{{ $t('about.future.content.l2') }}</li>
									<li>{{ $t('about.future.content.l3') }}</li>
									<li>{{ $t('about.future.content.l4') }}</li>
									<li>{{ $t('about.future.content.l5') }}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="h-[600px] max-lg:w-full lg:w-1/2 lg:pl-2">
						<div class="bg-white rounded-xl h-full">
							<img src="@/assets/images/About/Future.png" class="object-contain w-full h-full rounded-xl -scale-x-100" alt="game"/>
						</div>
					</div>
				</div>
			</article>
		</div>
	</Transition>
</template>

<style scoped>

.fade-enter-active {
	transition: opacity 0.3s ease-out;
}

.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
