<template>
	<div class="w-screen h-full bg-darkBackground min-h-[calc(100vh-65px)] overflow-clip">
		<div class="basis-2/3 bg-darkBackground relative">
			<div
				class="absolute h-[700px] w-[700px] rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 rotate-45 -right-[100px] -top-[500px] z-10"
			>
				<div class="absolute h-[670px] w-[670px] bg-darkBackground"></div>
			</div>
			<div
				class="absolute h-[1100px] w-[1100px] rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 opacity-50 rotate-45 -right-[300px] -top-[800px]"
			>
				<div class="absolute h-[1070px] w-[1070px] bg-darkBackground"></div>
			</div>
			<div
				class="absolute h-[1000px] w-[1100px] rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-50 -rotate-45 -left-[700px] -bottom-[130vh] z-10"
			>
				<div class="absolute h-[970px] w-[1070px] bg-darkBackground"></div>
			</div>
			<div
				class="absolute h-[1100px] w-[1100px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50 -rotate-45 -left-[560px] -bottom-[130vh]"
			>
				<div class="absolute h-[1070px] w-[1070px] bg-darkBackground"></div>
			</div>
		</div>
		<div class="flex md:w-[800px] lg:w-[1000px] 2xl:w-[1100px] mx-auto pt-10 relative z-10 drop-shadow-lg">
			<div class="w-1/2 rounded-l-lg flex justify-center aspect-[1/1.4142]">
				<img alt="game" class="object-fill w-full rounded-l-lg" src="@/assets/images/DemoCovers/Foxhole.png" />
			</div>
			<div class="w-1/2 text-gray-300 bg-lightBackground rounded-r-lg">
				<div class="m-10">
					<h1 class="text-4xl font-bold">
						<span>{{ game.gameName }}</span>
					</h1>
					<ul class="py-5 my-5 border-y border-gray-600">
						<li class="flex">
							<p class="w-[132px] h-[26px] mr-5">Nickname ingame:</p>
							<p class="italic font-semibold">
								<span v-if="!editing">{{ game.nicknameIngame }}</span>
								<input
									v-if="editing"
									v-model="editingForm.nicknameIngame"
									class="-ml-2 rounded-lg bg-darkBackground text-white px-2 w-full"
									placeholder="Nickname in-game"
								/>
							</p>
						</li>
						<li class="flex">
							<p class="w-[132px] h-[26px] mr-5">Hours played:</p>
							<p class="italic font-semibold">
								<span v-if="!editing">{{ game.hoursPlayed }}</span>
								<input
									v-if="editing"
									v-model="editingForm.hoursPlayed"
									class="-ml-2 rounded-lg bg-darkBackground text-white px-2 w-full"
									placeholder="Hours played"
									type="number"
								/>
							</p>
						</li>
						<li v-if="game.rank || editing" class="flex">
							<p class="w-[132px] h-[26px] mr-5">Rank:</p>
							<p class="italic font-semibold">
								<span v-if="!editing">{{ game.rank }}</span>
								<input
									v-if="editing"
									v-model="editingForm.rank"
									class="-ml-2 rounded-lg bg-darkBackground text-white px-2 w-full"
									placeholder="Rank"
								/>
							</p>
						</li>
						<li v-if="game.server || editing" class="flex">
							<p class="w-[132px] h-[26px] mr-5">Server:</p>
							<p class="italic font-semibold">
								<span v-if="!editing">{{ game.server }}</span>
								<input
									v-if="editing"
									v-model="editingForm.server"
									class="-ml-2 rounded-lg bg-darkBackground text-white px-2 w-full"
									placeholder="Server"
								/>
							</p>
						</li>
					</ul>
					<div v-if="game.comments || editing">
						<h4 class="font-bold">
							Comment:
							<router-link :to="'/profile/' + this.$route.params.userNick" class="text-sm italic font-semibold"
								>(by {{ this.$route.params.userNick }})
							</router-link>
						</h4>
						<p class="mt-1 ml-5">
							<span v-if="!editing">{{ game.comments }}</span>
							<textarea
								v-if="editing"
								v-model="editingForm.comments"
								class="-ml-2 rounded-lg bg-darkBackground text-white px-2 w-full min-h-[150px]"
								placeholder="Comment"
							/>
						</p>
					</div>

					<div v-if="editing" class="ml-auto w-fit my-5">
						<button v-if="!newGame" class="px-5 border-gray-600 hover:text-white" @click="editing = !editing">
							Cancel
						</button>
						<button-sub-component v-if="!newGame" name="Submit" @buttonClick="updateGame" />
						<button-sub-component v-if="newGame" name="Add new" @buttonClick="updateGame" />
					</div>
				</div>
				<div v-if="isTheProfileOwner" class="absolute bottom-5 w-1/2 flex justify-center text-xl text-gray-400">
					<div v-if="!editing">
						<button class="px-5 border-r border-gray-600 hover:text-white" @click="enableEditing">Edit</button>
						<button class="px-5 hover:text-white" @click="deleteGame">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import router from '@/router'

export default {
	name: 'GameView',
	components: {},
	props: {
		states: Object,
		email: String,
	},

	data() {
		return {
			editing: false,
			newGame: false,
			editingForm: {
				gameId: 0,
				gameName: '',
				nicknameIngame: '',
				hoursPlayed: 0,
				rank: '',
				server: '',
				comments: '',
				profileId: 0,
			},
		}
	},

	computed: {
		game() {
			if (this.$route.params.game !== 'new') {
				console.log(this.$route.params.game)
				return this.states.games.find(
					(e) => e.gameName === this.$route.params.game && e.profileId === this.profile.ProfileId
				)
			} else {
				return this.editingForm
			}
		},

		profile() {
			console.log(this.$route.params.userNick)
			return this.states.profiles.find((profile) => profile.Nickname === this.$route.params.userNick)
		},

		isTheProfileOwner() {
			return this.profile.Email === this.email
		},
	},

	methods: {
		enableEditing() {
			this.editing = !this.editing
			this.editingForm = this.game
		},

		updateGame() {
			if (!this.newGame) {
				axios
					.put('https://localhost:44372/api/Game', this.editingForm)
					.then((response) => (this.editingForm = response.data))
					.catch()
			} else {
				this.editingForm.profileId = this.profile.ProfileId

				axios
					.post('https://localhost:44372/api/Game', this.editingForm)
					.then((response) => router.push('/profile/' + this.$route.params.userNick))
					.catch()
			}

			this.editing = false
		},

		deleteGame() {
			if (!this.newGame) {
				axios
					.delete('https://localhost:44372/api/Game/' + this.game.gameId)
					.then((response) => router.push('/profile/' + this.profile.Nickname))
					.catch()
			}
		},
	},

	mounted() {
		if (this.$route.params.game !== 'new') {
			this.editingForm = this.game
		} else {
			this.editing = true
			this.newGame = true
		}
	},
}
</script>
