<template>
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
					<h2 class="mb-4 font-semibold text-3xl">Vision.</h2>
					<p class="mt-16">The idea is to have a social platform where gamers can bond, compete and find other gamers
						through video
						games.</p>
				</div>
			</div>
			<div class="h-[600px] max-lg:w-full lg:w-1/2 lg:pl-2 max-lg:order-1">
				<div class="bg-background-darker rounded-xl h-full">
					<img src="src/assets/images/Game.jpeg" class="object-cover w-full h-full rounded-xl" alt="game"/>
				</div>
			</div>

			<div class="h-[600px] max-lg:w-full lg:w-1/3 lg:pr-2 max-lg:order-4">
				<div class="bg-background-darker rounded-xl h-full">
					<img src="src/assets/images/Game.jpeg" class="object-cover w-full h-full rounded-xl" alt="game"/>
				</div>
			</div>
			<div class="h-[600px] max-lg:w-full lg:w-2/3 lg:pl-2 max-lg:order-3">
				<div class="bg-background-darker rounded-xl p-8 h-full">
					<h2 class="mb-4 font-semibold text-3xl">Our features!</h2>
					<div class="text-left mt-16">
						<h4 class="font-semibold mb-2 text-xl">On our app you can</h4>
						<ul class="list-disc list-inside">
							<li>On login your profile is created from your user on Discord. From there we get your initial locale,
								discord and your initial profile name.
							</li>
							<li>Make and use your very own profile and giving others a Nickname to call you by and optionally for
								other users your age and name.
							</li>
							<li>Add games and statistics in those games.</li>
							<li>Post your thoughts to a common page we call "feed".</li>
							<li>React to posts by either liking, disliking or discussing by comments.</li>
							<li>Edit or delete the above mentioned.</li>
							<li>View other people's profiles and games within.</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="h-[600px] max-lg:w-full lg:w-1/2 lg:pr-2">
				<div class="bg-background-darker rounded-xl p-8 h-full">
					<h2 class="mb-4 font-semibold text-3xl">Future?</h2>
					<div class="text-left mt-16">
						<h4 class="font-semibold mb-2 text-xl">In the future we would like to</h4>
						<ul class="list-disc list-inside">
							<li>Have dedicated communities for each game.</li>
							<li>Have a smart way of selecting games.</li>
							<li>Have a way for users to befriend each other on our platform.</li>
							<li>Have a smart way to search other users.</li>
							<li>Have custom communities for example for e-sports organizations.</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="h-[600px] max-lg:w-full lg:w-1/2 lg:pl-2">
				<div class="bg-background-darker rounded-xl h-full">
					<img src="src/assets/images/Game.jpeg" class="object-cover w-full h-full rounded-xl" alt="game"/>
				</div>
			</div>
		</div>
	</article>
</template>
