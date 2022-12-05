<template>
	<fieldset class="flex border rounded-xl mx-4 my-4 px-8 py-4 border-background-lightest w-full relative">
		<legend>Profile</legend>
		<div class="flex flex-col justify-between">
			<p>Nickname</p>
			<p>Firstname</p>
			<p>Lastname</p>
			<p>Age</p>
		</div>
		<div class="flex flex-col justify-between ml-8">
			<input
				id="nickname"
				v-model="profileDto.nickname"
				class="w-full bg-transparent border-b border-background-lightest text-text-default placeholder:text-text-darker outline-0 focus:border-text-white px-2"
			/>
			<input
				id="firstName"
				v-model="profileDto.firstName"
				class="w-full bg-transparent border-b border-background-lightest text-text-default placeholder:text-text-darker outline-0 focus:border-text-white px-2"
			/>
			<input
				id="lastName"
				v-model="profileDto.lastName"
				class="w-full bg-transparent border-b border-background-lightest text-text-default placeholder:text-text-darker outline-0 focus:border-text-white px-2"
			/>
			<input
				id="age"
				v-model="profileDto.age"
				type="number"
				class="w-full bg-transparent border-b border-background-lightest text-text-default placeholder:text-text-darker outline-0 focus:border-text-white px-2"
			/>
		</div>
		<div id="profileEditControls" class="absolute bottom-0 right-0 my-2 mx-4">
			<CancelButtonHelper @click="$emit('cancel')" ref="cancelButton" />
			<ButtonHelper name="edit" @click="putEdit" ref="editButton" />
		</div>
	</fieldset>
</template>

<script>
import axios from 'axios'
import ButtonHelper from '@/helpers/ButtonHelper.vue'
import CancelButtonHelper from '@/helpers/CancelButtonHelper.vue'
import { useMeStore } from '@/stores/me'

export default {
	name: 'EditProfileView',
	components: {
		ButtonHelper,
		CancelButtonHelper,
	},

	setup() {
		const meStore = useMeStore()

		return { meStore }
	},

	data() {
		return {
			profileDto: {
				nickname: '',
				firstName: '',
				lastName: '',
				age: 0,
			},

			me: null,
		}
	},

	methods: {
		async getMe() {
			this.me = this.meStore.$state

			this.profileDto.nickname = this.me.nickname
			this.profileDto.firstName = this.me.firstName
			this.profileDto.lastName = this.me.lastName
			this.profileDto.age = this.me.age
		},

		async putEdit() {
			axios
				.put('/api/Profile', this.profileDto)
				.then(() => {
					this.$emit('done')
					this.$emit('cancel')
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

	mounted() {
		this.getMe()
	},
}
</script>
