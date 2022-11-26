<template>
	<div class="sm:mx-4 my-2 sm:my-0">
		<div class="sm:flex">
			<!-- Nickname -->
			<h1 :id="profile.profileId + '-nickname'" class="text-2xl font-semibold" >{{ profile.nickname }}</h1>
			<!-- Full name -->
			<p
				v-if="profile.firstName || profile.lastName"
				class="opacity-70 text-xs sm:text-sm font-semibold h-fit my-auto sm:ml-2"
				id="fullName"
			>
				({{ profile.firstName }} {{ profile.lastName }})
			</p>
		</div>
		<!-- Age -->
		<p v-if="profile.age" class="text-xs sm:text-sm font-semibold opacity-70" id="age">Age: {{ profile.age }}</p>

		<!-- Discord -->
		<div :id="profile.profileId + '-discord'" class="flex mt-2 w-fit mx-auto sm:mx-0">
			<img class="object-contain w-4 mr-2" src="@/assets/images/discord-icon.png" alt="Discord"/>
			<h4 class="text-sm font-semibold" id="discordName">{{ profile.discordName }}</h4>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProfileInfoContentComponent',

	props: {
		profile: Object,
	},
}
</script>

<style scoped></style>
