<template>
	<div class="bg-background-default mb-4 sm:mb-8">
		<!-- Profile header -->
		<ProfileInfoComponent class="mt-2 mx-2" v-if="profile && tab === 1" :profile="profile" />

		<!-- Posts header -->
		<header
			v-if="tab === 2"
			class="bg-gradient-to-r from-primaryVariant via-primary to-pink-600 py-16 rounded-xl text-center text-text-white mt-2 mx-2 h-[212px]"
		>
			<div>
				<h1 class="text-5xl font-semibold">Your Posts</h1>
				<p class="font-semibold text-sm mt-2 italic">All the posts you have published.</p>
			</div>
		</header>

		<!-- Comment header -->
		<header
			v-if="tab === 3"
			class="bg-gradient-to-r from-teal-500 via-blue-600 to-sky-500 py-16 rounded-xl text-center text-text-white mt-2 mx-2 h-[212px]"
		>
			<div>
				<h1 class="text-5xl font-semibold">Your Comments</h1>
				<p class="font-semibold text-sm mt-2 italic">All your comments.</p>
			</div>
		</header>

		<!-- In profile navigation -->
		<div class="h-16 flex w-fit mx-auto">
			<button @click="tab = 1" class="px-4 h-full opacity-75 hover:opacity-100" :class="{ 'border-b': tab === 1 }">
				Games
			</button>
			<button @click="tab = 2" class="px-4 h-full opacity-75 hover:opacity-100" :class="{ 'border-b': tab === 2 }">
				Posts
			</button>
			<button @click="tab = 3" class="px-4 h-full opacity-75 hover:opacity-100" :class="{ 'border-b': tab === 3 }">
				Comments
			</button>
		</div>

		<!-- Games container -->
		<section class="flex flex-col mb-2 mx-2">
			<div class="sm:px-8 sm:py-4 sm:mb-4 bg-background-darker rounded-xl max-w-[1600px] mx-auto w-full">
				<RouterLink :to="profile.profileId + '/game/new'">
					<button
						class="flex text-lg z-20 sm:text-xl max-sm:fixed max-sm:p-4 sm:py-2 sm:px-4 bottom-0 right-0 font-semibold capitalize rounded-2xl bg-primary max-sm:m-4 shadow-xl transition duration-150 ease-out hover:bg-primaryVariant hover:scale-110"
					>
						<span class="h-[24px] mr-2 my-auto material-symbols-outlined font-bold">add</span>
						<span class="mr-2">New</span>
					</button>
				</RouterLink>
			</div>
			<GamesLayout v-if="tab === 1" :games="games" :profile-id="profile.profileId" />
		</section>

		<!-- New Post -->
		<!-- Posts -->
		<section v-if="posts && tab === 2" class="max-w-[1600px] mx-auto">
			<NewPostComponent v-if="addingNew" @updatePost="getPosts" @cancel="addingNew = false" />
			<div v-if="!addingNew" class="sm:px-8 sm:py-4 sm:mb-4 sm:mx-4 lg:mx-8 bg-background-darker rounded-xl">
				<button
					@click="addingNew = true"
					class="flex text-lg z-20 sm:text-xl max-sm:fixed max-sm:p-4 sm:py-2 sm:px-4 bottom-0 right-0 font-semibold capitalize rounded-2xl bg-primary max-sm:m-4 shadow-xl transition duration-150 ease-out hover:bg-primaryVariant hover:scale-110"
				>
					<span class="h-[24px] mr-2 my-auto material-symbols-outlined font-bold">add</span>
					<span class="mr-2">New</span>
				</button>
			</div>
			<PostsLayout :posts="posts" @updatePost="getPosts" />
		</section>
	</div>
</template>

<script>
import axios from 'axios'
import ProfileInfoComponent from '@/components/profile/ProfileInfoComponent.vue'
import NewPostComponent from '@/components/posts/NewPostComponent.vue'
import GamesLayout from '@/layouts/GamesLayout.vue'
import PostsLayout from '@/layouts/PostsLayout.vue'

export default {
	name: 'ProfileView',
	components: {
		PostsLayout,
		GamesLayout,
		ProfileInfoComponent,
		NewPostComponent,
	},

	data() {
		return {
			paramProfileId: '',
			profile: {},
			games: [],
			posts: [],

			tab: 1,
			addingNew: false,
		}
	},

	methods: {
		getProfile() {
			if (this.paramProfileId) {
				axios
					.get('https://localhost:5001/api/Profile/' + this.paramProfileId)
					.then((response) => {
						this.profile = response.data
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},

		getGames() {
			if (this.paramProfileId) {
				axios
					.get('https://localhost:5001/api/Game/ByUser/' + this.paramProfileId)
					.then((response) => {
						this.games = response.data
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},

		getPosts() {
			if (this.paramProfileId) {
				axios
					.get('https://localhost:5001/api/Post/GetByProfileId/' + this.paramProfileId)
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
		this.paramProfileId = this.$route.params.profileId
		this.getProfile()
		this.getGames()
		this.getPosts()
	},
}
</script>
