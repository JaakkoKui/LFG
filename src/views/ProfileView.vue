<template>
	<div class="bg-background-default mb-4 sm:mb-8">
		<!-- Profile header -->
		<ProfileInfoComponent class="mt-2 mx-2" v-if="profile && tab === 1" :profile="profile" />

		<!-- Posts header -->
		<header
			v-if="tab === 2"
			class="bg-gradient-to-r from-primaryVariant via-primary to-pink-600 py-16 rounded-xl text-center text-text-white mt-2 mx-2"
		>
			<div>
				<h1 class="text-5xl font-semibold">Your Posts</h1>
				<p class="font-semibold text-sm mt-2 italic">All the posts you have published.</p>
			</div>
		</header>

		<header
			v-if="tab === 3"
			class="bg-gradient-to-r from-teal-500 via-blue-600 to-sky-500 py-16 rounded-xl text-center text-text-white mt-2 mx-2"
		>
			<div>
				<h1 class="text-5xl font-semibold">Your Comments</h1>
				<p class="font-semibold text-sm mt-2 italic">All your comments.</p>
			</div>
		</header>

		<div class="h-16 flex w-fit mx-auto">
			<button @click="tab = 1" class="px-4 h-full opacity-75 hover:opacity-100">Games</button>
			<button @click="tab = 2" class="px-4 h-full opacity-75 hover:opacity-100">Posts</button>
			<button @click="tab = 3" class="px-4 h-full opacity-75 hover:opacity-100">Comments</button>
		</div>

		<!-- Games container -->
		<GamesLayout class="mb-2 mx-2" v-if="tab === 1" :games="games" :profile-id="profile.profileId" />

		<!-- New Post -->
		<!-- Posts -->
		<PostsLayout v-if="posts && tab === 2" :posts="posts" />
	</div>
</template>

<script>
import axios from 'axios'
import ProfileInfoComponent from '@/components/profile/ProfileInfoComponent.vue'
import GamesLayout from '@/layouts/GamesLayout.vue'
import PostsLayout from '@/layouts/PostsLayout.vue'

export default {
	name: 'ProfileView',
	components: {
		PostsLayout,
		GamesLayout,
		ProfileInfoComponent,
	},

	data() {
		return {
			profile: {},
			games: [],
			posts: [],

			tab: 1,
		}
	},

	methods: {
		getProfile(id) {
			if (id) {
				axios
					.get('https://localhost:5001/api/Profile/' + id)
					.then((response) => {
						this.profile = response.data
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},

		getGames(id) {
			if (id) {
				axios
					.get('https://localhost:5001/api/Game/ByUser/' + id)
					.then((response) => {
						this.games = response.data
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},

		getPosts(id) {
			if (id) {
				axios
					.get('https://localhost:5001/api/Post/GetByProfileId/' + id)
					.then((response) => {
						this.posts = response.data
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},
	},

	mounted() {
		const profileId = this.$route.params.profileId
		this.getProfile(profileId)
		this.getGames(profileId)
		this.getPosts(profileId)
	},
}
</script>
