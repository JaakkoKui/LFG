<template>
	<div class="bg-background-default mb-4 sm:mb-8">
		<!-- Profile header -->
		<ProfileInfoComponent
			@updateProfile="getProfile"
			class="mt-2 mx-2"
			v-if="profile && tab === 1"
			:profile="profile"
		/>

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
		<section v-if="tab === 1" class="flex flex-col max-w-[1600px] mx-auto w-full px-2 sm:px-4 lg:px-8">
			<div class="sm:px-8 sm:py-4 sm:mb-4 bg-background-darker rounded-xl">
				<RouterLink :to="profile.profileId + '/game/new'">
					<button
						class="flex text-lg z-20 sm:text-xl max-sm:fixed max-sm:p-4 sm:py-2 sm:px-4 bottom-0 right-0 font-semibold capitalize rounded-2xl bg-primary max-sm:m-4 shadow-xl transition duration-150 ease-out hover:bg-primaryVariant hover:scale-110"
					>
						<span class="h-[24px] mr-2 my-auto material-symbols-outlined font-bold">add</span>
						<span class="mr-2">New</span>
					</button>
				</RouterLink>
			</div>
			<GamesLayout :games="games" :profile-id="profile.profileId" />
		</section>

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

		<section v-if="comments && tab === 3" class="max-w-[1600px] mx-auto">
			<div class="mx-4 w-full sm:mx-4 lg:mx-8 bg-background-darker rounded-xl py-4">
				<CommentsLayout @updateComments="getComments" :comments="comments" />
			</div>
		</section>
	</div>
</template>

<script>
import axios from 'axios'
import ProfileInfoComponent from '@/components/profile/ProfileInfoComponent.vue'
import NewPostComponent from '@/components/posts/NewPostComponent.vue'
import GamesLayout from '@/layouts/GamesLayout.vue'
import PostsLayout from '@/layouts/PostsLayout.vue'
import CommentsLayout from '@/layouts/CommentsLayout.vue'

export default {
	name: 'ProfileView',
	components: {
		PostsLayout,
		GamesLayout,
		NewPostComponent,
		ProfileInfoComponent,
		CommentsLayout,
	},

	data() {
		return {
			paramProfileId: '',
			profile: {},
			games: [],
			posts: [],
			comments: [],

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
					.get('/api/Game/ByUser/' + this.paramProfileId)
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
					.get('/api/Post/GetByProfileId/' + this.paramProfileId)
					.then((response) => {
						this.posts = response.data
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},

		getComments() {
			if (this.paramProfileId) {
				axios
					.get('/api/Comment/GetByProfileId/' + this.paramProfileId)
					.then((response) => {
						this.comments = response.data
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
		this.getComments()
	},
}
</script>
