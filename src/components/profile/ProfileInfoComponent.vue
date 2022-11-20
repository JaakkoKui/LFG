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
			/>
			<div class="sm:mx-4 my-2 sm:my-0">
				<div class="sm:flex">
					<!-- Nickname -->
					<h1 class="text-2xl font-semibold">{{ profile.nickname }}</h1>
					<!-- Full name -->
					<p
						v-if="profile.firstName || profile.lastName"
						class="opacity-70 text-xs sm:text-sm font-semibold h-fit my-auto sm:ml-2"
					>
						({{ profile.firstName }} {{ profile.lastName }})
					</p>
				</div>
				<!-- Age -->
				<p v-if="profile.age" class="text-xs sm:text-sm font-semibold opacity-70">Age: {{ profile.age }}</p>

				<!-- Discord -->
				<div class="flex mt-2 w-fit mx-auto sm:mx-0">
					<img class="object-contain w-4 mr-2" src="@/assets/images/discord-icon.png" alt="Discord" />
					<h4 class="text-sm font-semibold">{{ profile.discordName }}</h4>
				</div>
			</div>
		</div>

		<div class="flex absolute right-0 top-0 h-full">
			<p class="font-semibold opacity-70 mr-4 my-auto">{{ simplifiedDate }}</p>
			<div v-if="isOwner" class="flex m-2 rounded-xl bg-background-default p-2">
				<div class="flex flex-col justify-between">
					<button class="p-4 bg-red-500 rounded-xl material-symbols-outlined font-bold">Delete</button>
					<button class="p-4 bg-sky-700 rounded-xl material-symbols-outlined font-bold">Edit</button>
					<button class="p-4 bg-primary rounded-xl material-symbols-outlined font-bold">Link</button>
				</div>
			</div>
		</div>
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

	computed: {
		simplifiedDate() {
			try {
				const jDate = this.profile.joiningDate.split('T')
				const seperatedDates = jDate[0].split('-')
				return seperatedDates[2] + '.' + seperatedDates[1] + '.' + seperatedDates[0]
			} catch (e) {
				console.log(e)
				return null
			}
		},
	},
}
</script>
