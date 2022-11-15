<template>
	<div class="w-full h-full p-10 xl:px-20">
		<h1 class="text-5xl font-bold border-b-2 pb-5">
			<input
				v-model="gameDto.gameName"
				class="w-full rounded-lg bg-darkBackground mt-1 px-1"
				placeholder="Game Name*"
			/>
		</h1>
		<div class="flex my-5">
			<div class="font-bold capitalize mr-5 truncate w-fit flex flex-col gap-y-1">
				<h4>Nickname In-game <span class="text-sm text-white" :class="{ 'text-red-600': faulty }">*</span></h4>
				<h4>Hours played</h4>
				<h4>Rank</h4>
				<h4>Server</h4>
			</div>
			<div class="flex flex-col gap-y-1">
				<input v-model="gameDto.nicknameInGame" class="w-full rounded-lg bg-darkBackground px-1" />
				<input v-model="gameDto.hoursPlayed" type="number" class="w-full rounded-lg bg-darkBackground px-1" />
				<input v-model="gameDto.rank" class="w-full rounded-lg bg-darkBackground px-1" />
				<input v-model="gameDto.server" class="w-full rounded-lg bg-darkBackground px-1" />
			</div>
		</div>
		<h4 class="font-bold">Comment</h4>
		<textarea v-model="gameDto.comments" class="w-full rounded-lg bg-darkBackground mt-1 px-1" rows="5"></textarea>

		<div class="flex absolute right-0 bottom-0 m-5">
			<CancelButtonHelper @click="cancelNew" />
			<ButtonHelper name="Add" @click="postNewGame" />
		</div>
	</div>
</template>

<script>
import CancelButtonHelper from '@/helpers/CancelButtonHelper.vue'
import ButtonHelper from '@/helpers/ButtonHelper.vue'
import axios from 'axios'
import router from '@/router'

export default {
	name: 'NewGameContentComponent',
	components: {
		CancelButtonHelper,
		ButtonHelper,
	},

	data() {
		return {
			faulty: false,

			gameDto: {
				gameName: '',
				nicknameInGame: '',
				hoursPlayed: null,
				rank: '',
				server: '',
				comments: '',
			},
		}
	},

	methods: {
		cancelNew() {
			router.push('/profile/' + this.$route.params.profileId)
		},

		postNewGame() {
			if (this.gameDto.gameName.length > 0 && this.gameDto.nicknameInGame.length > 0) {
				axios
					.post('https://localhost:5001/api/Game', this.gameDto)
					.then(() => {
						router.push('/')
					})
					.catch()
			} else {
				this.faulty = true
			}
		},
	},
}
</script>
