<template>
	<fieldset
		class="flex flex-col sm:w-full border rounded-xl mx-4 my-4 px-8 pt-4 pb-2 sm:py-4 border-background-lightest relative">
		<legend>{{ $t('profile.info.profile') }}</legend>

		<article class="flex">
			<!-- Field legends -->
			<div class="flex flex-col justify-between">
				<p>{{ $t('profile.info.nickname') }}</p>
				<p>{{ $t('profile.info.firstname') }}</p>
				<p>{{ $t('profile.info.lastname') }}</p>
				<p>{{ $t('profile.info.age') }}</p>
			</div>
			<!-- Input fields -->
			<div class="flex flex-col justify-between ml-8">
				<input
					id="nickname"
					v-model="profileDto.nickname"
					class="w-full bg-transparent border-b border-background-lightest text-text-default placeholder:text-text-darker outline-0 focus:border-text-white px-2"
					maxlength="30"
				/>
				<input
					id="firstName"
					v-model="profileDto.firstName"
					class="w-full bg-transparent border-b border-background-lightest text-text-default placeholder:text-text-darker outline-0 focus:border-text-white px-2"
		  		maxlength="30"
				/>
				<input
					id="lastName"
					v-model="profileDto.lastName"
					class="w-full bg-transparent border-b border-background-lightest text-text-default placeholder:text-text-darker outline-0 focus:border-text-white px-2"
		  		maxlength="30"
				/>
				<input
					id="age"
					v-model="profileDto.age"
					type="number"
					class="w-full bg-transparent border-b border-background-lightest text-text-default placeholder:text-text-darker outline-0 focus:border-text-white px-2"
					max="199"
					min="0"
				/>
			</div>
		</article>

		<!-- Error toast -->
		<Toast @close="faulty = false" :text="$t('exceptions.age')"/>

		<!-- Profile edit controls -->
		<div id="profileEditControls"
				 class="flex sm:absolute bottom-0 right-0 mt-4 pt-2 sm:my-2 sm:mx-4 max-sm:border-t border-background-lighter">
			<div class="ml-auto">
				<CancelButtonHelper id="profileEditCancel" @click="$emit('cancel')" ref="cancelButton"/>
				<ButtonHelper id="profileEditConfirm" :name="$t('buttons.edit')" @click="putEdit" ref="editButton"/>
			</div>
		</div>
	</fieldset>
</template>

<script>
import axios from 'axios'
import ButtonHelper from '@/helpers/ButtonHelper.vue'
import CancelButtonHelper from '@/helpers/CancelButtonHelper.vue'
import {useMeStore} from '@/stores/me'
import Toast from "@/components/exceptions/Toast.vue";

export default {
	name: 'EditProfileView',
	components: {
	Toast,
		ButtonHelper,
		CancelButtonHelper,
	},

	//Setup pinia for getting your profile data to edit
	setup() {
		const meStore = useMeStore()
		return {meStore}
	},

	//Keep data about profile Data Transfer Object in order to send it to API
	data() {
		return {
			profileDto: {
				nickname: '',
				firstName: '',
				lastName: '',
				age: 0,
			},

			me: null,
			faulty: false,
		}
	},

	methods: {
		//Gets your profile from pinia and fits it to the profile Data Transfer Object
		async getMe() {
			this.me = this.meStore.$state

			this.profileDto.nickname = this.me.nickname
			this.profileDto.firstName = this.me.firstName
			this.profileDto.lastName = this.me.lastName
			this.profileDto.age = this.me.age
		},

		//Updates your profile information when user decides to do so
		async putEdit() {
			if (this.profileDto.age < 200 && this.profileDto.age >= 0) {
				axios
					.put('/api/Profile', this.profileDto)
					.then(() => {
						this.$emit('done')
						this.$emit('cancel')
					})
					.catch((error) => {
						console.log(error)
					})
			} else {
			  this.faulty = true
			}
		},
	},

	computed: {
		//Simplifies the date from it's SQL timestamp form
		simplifiedDate() {
			let date = new Date(this.profile.joiningDate)
			date = date + date.getTimezoneOffset()
			date = date + new Date().getTimezoneOffset()
			date = new Date(date)
			return this.$t('date.joinDate', {day: date.getDate(), month: date.getMonth(), year: date.getFullYear()})
		},
	},

	//Gets your profile when edit structure is set
	mounted() {
		this.getMe()
	},
}
</script>
