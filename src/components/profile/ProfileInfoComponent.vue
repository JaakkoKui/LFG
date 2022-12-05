<template>
	<section v-if="profile" class="sm:flex sm:justify-between bg-background-darker rounded-xl sm:h-[212px] sm:pl-8 max-sm:p-2 sm:relative">
		<!-- Profile info profile -->
		<div
			class="flex flex-col sm:flex-row w-fit sm:h-fit max-sm:mx-auto text-center sm:text-left sm:mx-8 sm:my-auto max-sm:mt-2"
			:class="{ 'w-fit': editing, 'sm:w-full': !editing, blur: deleting }"
		>
			<!-- Profile info avatar -->
			<AvatarHelper
				class="max-w-[76px] max-h-[76px] w-[76px] mx-auto sm:m-0 sm:ml-8"
				:avatar="profile.avatar"
				:profile-id="profile.profileId"
				ref="avatarHelper"
			/>

			<!-- Profile info content -->
			<ProfileInfoContentComponent v-if="!editing" :profile="profile" ref="profileInfo" />
		</div>

		<!-- Profile edit-->
		<ProfileEditComponent v-if="editing" @done="$emit('updateProfile')" @cancel="editing = false" ref="profileEdit" />

		<!-- Confirm profile delete -->
		<section v-if="deleting" class="absolute w-full h-full left-0 max-sm:p-8 top-0 flex">
			<div class="m-auto w-fit h-fit">
				<p class="italic font-semibold max-sm:text-center" id="areYouSure">
		  		{{$t('profile.info.deleteConfirmation')}}
				</p>
				<div class="flex max-sm:mx-auto max-sm:w-fit max-sm:flex-col gap-x-4">
					<button
						id="cancelButton"
						@click="deleting = false"
						class="rounded-xl px-8 py-2 font-semibold sm:w-1/2 mt-2 sm:mt-4 hover:text-text-lighter max-sm:order-2"
					>
						{{$t('buttons.cancel')}}
					</button>
					<button
						id="confirmDelete"
						@click="deleteProfile"
						class="bg-red-500 rounded-xl px-8 py-2 font-semibold sm:w-1/2 mt-4 hover:bg-red-600 transition hover:scale-110 duration-200 ease-out"
					>
						{{$t('buttons.delete')}}
					</button>
				</div>
			</div>
		</section>

		<aside v-if="!editing && isOwner" class="sm:flex sm:absolute right-0 top-0 h-full">
			<!-- Profile create date -->
			<p id="profileCreateDate" class="font-semibold opacity-70 max-sm:text-center max-sm:mb-2 sm:mr-4 sm:my-auto" :class="{ blur: deleting }">
				{{ simplifiedDate }}
			</p>

			<!-- Locale menu -->
			<section v-if="localeChange" class="flex flex-col rounded-xl bg-background-default p-2 max-sm:justify-center sm:my-2 overflow-y-auto z-10 max-sm:mb-2">
				<button v-for="locale in locales" :id="locale.lang" @click="$i18n.locale = locale.lang" class="py-2 px-4 text-center border-b border-background-lighter transition duration-100 hover:text-text-white hover:scale-105">
					{{locale.language}}
				</button>
			</section>

	  	<!-- Profile controls -->
			<section
				id="controlButtons"
				v-if="isOwner && !deleting"
				class="flex rounded-xl bg-background-default p-2 max-sm:justify-center sm:m-2"
			>
				<div class="flex max-sm:gap-x-2 sm:flex-col sm:justify-between">
					<button
						id="deleteButton"
						@click="deleting = true"
						class="p-4 bg-red-500 rounded-xl material-symbols-outlined font-bold transition duration-150 hover:scale-110 hover:bg-red-600"
					>
						Delete
					</button>
					<button
						id="editButton"
						@click="editing = true"
						class="p-4 bg-sky-700 rounded-xl material-symbols-outlined font-bold transition duration-150 hover:scale-110 hover:bg-sky-800"
					>
						Edit
					</button>
					<button
						id="linkButton"
						@click="localeChange = !localeChange"
						class="p-4 bg-primary rounded-xl material-symbols-outlined font-bold transition duration-150 hover:scale-110 hover:bg-primaryVariant"
					>
						translate
					</button>
				</div>
			</section>
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

	//Props passed down from the profileview parent.
	props: {
		profile: Object,
		isOwner: Boolean,
	},

	//Keep track is profile is being edited or deleted
	data() {
		return {
			editing: false,
			deleting: false,
	  	localeChange: false,

			locales: [
			  { language: 'Finnish', lang: 'fi'},
				{ language: 'English', lang: 'en'},
				{ language: 'Japanese', lang: 'ja'},
			]
		}
	},

	methods: {
	  //On delete confirm, delete your profile. Logged in profile is defined in the backend
		async deleteProfile() {
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
	  //Simplifies the date from it's SQL timestamp form
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
