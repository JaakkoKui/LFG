<template>
	<section
		v-if="profile"
		class="flex sm:justify-between px-8 sm:px-8 py-4 sm:py-16 bg-background-darker rounded-xl h-[204px] relative"
	>
		<div class="flex flex-col sm:flex-row w-fit mx-auto sm:m-0 sm:w-full text-center sm:text-left">
			<AvatarHelper
				class="max-w-[76px] max-h-[76px] w-[76px] mx-auto sm:m-0"
				:avatar="profile.avatar"
				:profile-id="profile.profileId"
				ref="avatarHelper"
			/>
			<div class="sm:mx-4 my-2 sm:my-0">
				<div class="sm:flex">
					<!-- Nickname -->
					<h1 class="text-2xl font-semibold" id="nickname">{{ profile.nickname }}</h1>
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
				<div class="flex mt-2 w-fit mx-auto sm:mx-0" id="discord">
					<img class="object-contain w-4 mr-2" src="@/assets/images/discord-icon.png" alt="Discord" />
					<h4 class="text-sm font-semibold" id="discordName">{{ profile.discordName }}</h4>
				</div>
			</div>
		</div>

		<p class="text-sm absolute mr-4 left-0 w-20 sm:static font-semibold opacity-70" id="joiningDate">{{ profile.joiningDate }}</p>
	</section>
</template>

<script>
import AvatarHelper from '@/helpers/AvatarHelper.vue'

export default {
	name: 'ProfileInfoComponent',
	components: { AvatarHelper },

	props: {
		profile: Object,
	},

	data() {
		return {
			isOwner: true,
		}
	},
}
</script>
