<template>
	<!-- Profile header -->
	<ProfileInfoComponent v-if="profile" :profile="profile" />

	<!-- Games container -->
	<GamesLayout v-if="games" :games="games" :profile-id="profile.profileId" />

	<!-- Posts container -->
	<div class="flex font-bold ml-10 my-5 border-b-4 border-gray-300 text-3xl w-[calc(100%-100px)]">
		<h1 class="bg-darkBackground pr-5 -mb-4 w-fit">Posts</h1>
		<div class="bg-darkBackground text-base px-5 -mb-5 -mr-10 w-fit ml-auto">
			<ButtonHelper name="new post" />
		</div>
	</div>

	<!-- New Post -->

	<!-- Posts -->
	<PostsLayout :posts="posts" />
</template>

<script>
import axios from 'axios'
import ProfileInfoComponent from '@/components/profile/ProfileInfoComponent.vue'
import GamesLayout from '@/layouts/GamesLayout.vue'
import PostsLayout from '@/layouts/PostsLayout.vue'
import ButtonHelper from '@/helpers/ButtonHelper.vue'

export default {
	name: 'ProfileView',
	components: {
		PostsLayout,
		GamesLayout,
		ProfileInfoComponent,
		ButtonHelper,
	},

	data() {
		return {
			profile: {},
			games: [],
			posts: [],
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
					.get('https://localhost:5001/api/Game')
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
