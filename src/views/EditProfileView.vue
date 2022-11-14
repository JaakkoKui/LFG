<template>
	<div v-if="isTheProfileOwner" class="min-h-[calc(100vh-65px)] w-screen bg-darkBackground text-gray-300">
		<form class="w-fit mx-auto p-10">
			<div class="flex-col flex gap-y-3 w-[420px]">
				<label>
					<p class="mb-1 font-semibold">Nickname</p>
					<input
						id="username"
						v-model="profileUpdateData.Nickname"
						class="rounded-md px-2 py-1 bg-lightBackground w-[420px]"
						name="username"
						placeholder="Nickname"
					/>
				</label>
				<div class="flex gap-x-[20px]">
					<label>
						<p class="mb-1 font-semibold">First name</p>
						<input
							id="firstname"
							v-model="profileUpdateData.FirstName"
							class="rounded-md px-2 py-1 bg-lightBackground w-[200px]"
							name="firstname"
							placeholder="First name"
						/>
					</label>
					<label>
						<p class="mb-1 font-semibold">Last name</p>
						<input
							id="lastname"
							v-model="profileUpdateData.LastName"
							class="rounded-md px-2 py-1 bg-lightBackground w-[200px]"
							name="lastname"
							placeholder="Last name"
						/>
					</label>
				</div>
				<label>
					<p class="mb-1 font-semibold">Age</p>
					<input
						id="age"
						v-model="profileUpdateData.Age"
						class="rounded-md px-2 py-1 bg-lightBackground w-[420px]"
						name="age"
						type="number"
					/>
				</label>
				<label>
					<p class="mb-1 font-semibold">Discord Nick</p>
					<input
						id="discord"
						v-model="profileUpdateData.DiscordNick"
						class="rounded-md px-2 py-1 bg-lightBackground w-[420px]"
						name="discord"
						placeholder="Discord nick"
					/>
				</label>
				<ButtonSubComponent
					class="ml-auto mt-3 mb-5"
					name="Update Profile"
					type="button"
					@buttonClick="updateProfile"
				/>
			</div>
			<hr class="w-full border-gray-600 w-full ml-auto" />
			<div class="flex-col flex gap-y-3 mt-5 w-[420px]">
				<label>
					<p class="mb-1 font-semibold">Current Password</p>
					<input
						id="currentPassword"
						class="rounded-md px-2 py-1 bg-lightBackground w-[420px]"
						name="currentPassword"
						placeholder="Current password"
						type="password"
					/>
				</label>
				<label>
					<p class="mb-1 mt-5 font-semibold">New Password</p>
					<input
						id="password"
						class="rounded-md px-2 py-1 bg-lightBackground w-[420px]"
						name="password"
						placeholder="New password"
						type="password"
					/>
				</label>
				<ButtonSubComponent class="ml-auto mt-3 mb-5" name="Set Password" type="button" />
			</div>
			<hr class="w-full border-gray-600 w-full ml-auto" />
			<div class="flex justify-right">
				<ButtonSubComponent
					class="ml-auto !bg-red-500 hover:!bg-red-700 mt-3 mb-5"
					name="Delete Profile"
					type="button"
					@buttonClick="deleteProfile"
				/>
			</div>
		</form>
	</div>
	<div v-else class="text-center w-full my-20">
		<h1 class="text-7xl font-bold">='(</h1>
		<h4 class="text-4xl font-bold w-full mt-10">Something went wrong...</h4>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'EditProfileView',
	components: {},

	props: {
		email: String,
	},

	data() {
		return {
			profileUpdateData: {},
		}
	},

	computed: {
		profile() {
			return this.states.profiles.find((profile) => profile.Nickname === this.$route.params.userNick)
		},

		isTheProfileOwner() {
			return this.profile.Email === this.email
		},
	},

	methods: {
		updateProfile() {
			axios.put('https://localhost:44372/api/Profile', this.profileUpdateData).then().catch()
		},

		deleteProfile() {
			axios.delete('https://localhost:44372/api/Profile', this.profile.ProfileId)
		},
	},

	mounted() {
		this.profileUpdateData = this.profile
	},
}
</script>
