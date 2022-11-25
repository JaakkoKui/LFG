<template>
	<section v-if="profile" class="sm:flex sm:justify-between bg-background-darker rounded-xl sm:h-[212px] pl-8 relative">
		<div
			class="flex flex-col sm:flex-row w-fit mx-auto sm:m-0 text-center sm:text-left mx-8 my-4 sm:my-16"
			:class="{ 'w-fit': editing, 'sm:w-full': !editing, blur: deleting }"
		>
			<AvatarHelper
				class="max-w-[76px] max-h-[76px] w-[76px] mx-auto sm:m-0 ml-8"
				:avatar="profile.avatar"
				:profile-id="profile.profileId"
			/>

			<ProfileInfoContentComponent v-if="!editing" :profile="profile" />
		</div>

		<ProfileEditComponent v-if="editing" @done="$emit('updateProfile')" @cancel="editing = false" />

		<div v-if="deleting" class="absolute w-full h-full left-0 max-sm:p-8 top-0 flex">
			<div class="m-auto w-fit h-fit">
				<p class="italic font-semibold max-sm:text-center">Are you sure you want to delete your profile permanently?</p>
				<div class="flex max-sm:mx-auto max-sm:w-fit max-sm:flex-col gap-x-4">
					<button
						@click="deleting = false"
						class="rounded-xl px-8 py-2 font-semibold sm:w-1/2 mt-2 sm:mt-4 hover:text-text-lighter max-sm:order-2"
					>
						Cancel
					</button>
					<button
						@click="deleteProfile"
						class="bg-red-500 rounded-xl px-8 py-2 font-semibold sm:w-1/2 mt-4 hover:bg-red-600 transition hover:scale-110 duration-200 ease-out"
					>
						Delete
					</button>
				</div>
			</div>
		</div>

		<aside v-if="!editing" class="sm:flex sm:absolute right-0 top-0 h-full">
			<p class="font-semibold opacity-70 max-sm:text-center max-sm:mb-2 sm:mr-4 sm:my-auto" :class="{ blur: deleting }">
				{{ simplifiedDate }}
			</p>
			<div
				v-if="isOwner && !deleting"
				class="flex sm:m-2 rounded-xl bg-background-default p-2 max-sm:w-full max-sm:justify-center"
			>
				<div class="flex max-sm:gap-x-2 sm:flex-col sm:justify-between">
					<button
						@click="deleting = true"
						class="p-4 bg-red-500 rounded-xl material-symbols-outlined font-bold transition duration-150 hover:scale-110 hover:bg-red-600"
					>
						Delete
					</button>
					<button
						@click="editing = true"
						class="p-4 bg-sky-700 rounded-xl material-symbols-outlined font-bold transition duration-150 hover:scale-110 hover:bg-sky-800"
					>
						Edit
					</button>
					<button
						class="p-4 bg-primary rounded-xl material-symbols-outlined font-bold transition duration-150 hover:scale-110 hover:bg-primaryVariant"
					>
						link
					</button>
				</div>
			</div>
		</aside>
	</section>
</template>

<script>
import AvatarHelper from '@/helpers/AvatarHelper.vue'
import ProfileEditComponent from '@/components/profile/ProfileEditComponent.vue'
import ProfileInfoContentComponent from '@/components/profile/ProfileInfoContentComponent.vue'
import axios from 'axios'
import router from '@/router'

export default {
	name: 'ProfileInfoComponent',
	components: {
		AvatarHelper,
		ProfileEditComponent,
		ProfileInfoContentComponent,
	},

	props: {
		profile: Object,
	},

	data() {
		return {
			isOwner: true,
			editing: false,
			deleting: false,
		}
	},

	methods: {
		deleteProfile() {
			axios
				.delete('/api/Profile/')
				.then(() => {
					router.push('/')
				})
				.catch((error) => {
					console.log(error)
				})
		},
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
