<template>
	<div class="bg-background-default mb-4 sm:mb-8">
		<!-- Profile header -->
		<ProfileInfoComponent
			@updateProfile="getProfile"
			class="mt-2 mx-2"
			v-if="profile && tab === 1"
			:profile="profile"
			:isOwner="isOwner"
		/>

		<!-- Posts header -->
		<header
			v-if="tab === 2"
			class="bg-gradient-to-r from-primaryVariant via-primary to-pink-600 py-16 rounded-xl text-center text-text-white mt-2 mx-2 h-[212px]"
		>
			<div v-if="isOwner">
				<h1 class="text-4xl sm:text-5xl font-semibold">{{$t('profile.headers.yourPosts.title')}}</h1>
				<p class="font-semibold text-sm mt-2 italic">{{$t('profile.headers.yourPosts.description')}}</p>
			</div>
			<div v-else>
				<h1 class="text-5xl font-semibold">{{$t('profile.headers.theirPosts.title', { nickname: profile.nickname })}}</h1>
				<p class="font-semibold text-sm mt-2 italic">{{$t('profile.headers.theirPosts.description', { nickname: profile.nickname })}}</p>
			</div>
		</header>

		<!-- Comment header -->
		<header
			v-if="tab === 3"
			class="bg-gradient-to-r from-teal-500 via-blue-600 to-sky-500 py-16 rounded-xl text-center text-text-white mt-2 mx-2 h-[212px]"
		>
			<div v-if="isOwner">
				<h1 class="text-4xl sm:text-5xl font-semibold">{{$t('profile.headers.yourComments.title')}}</h1>
				<p class="font-semibold text-sm mt-2 italic">{{$t('profile.headers.yourComments.description')}}</p>
			</div>
			<div v-else>
				<h1 class="text-5xl font-semibold">{{$t('profile.headers.theirComments.title', { nickname: profile.nickname }) }}</h1>
				<p class="font-semibold text-sm mt-2 italic">{{$t('profile.headers.theirComments.description', { nickname: profile.nickname })}}</p>
			</div>
		</header>

		<!-- In profile navigation -->
		<div class="h-16 flex w-fit mx-auto">
			<button @click="tab = 1" class="px-4 h-full opacity-75 hover:opacity-100 capitalize" :class="{ 'border-b': tab === 1 }">
				{{$t('profile.nav.games')}}
			</button>
			<button @click="tab = 2" class="px-4 h-full opacity-75 hover:opacity-100 capitalize" :class="{ 'border-b': tab === 2 }">
				{{$t('profile.nav.posts')}}
			</button>
			<button @click="tab = 3" class="px-4 h-full opacity-75 hover:opacity-100 capitalize" :class="{ 'border-b': tab === 3 }">
				{{$t('profile.nav.comments')}}
			</button>
		</div>

		<!-- Games container -->
		<section v-if="tab === 1" class="flex flex-col max-w-[1600px] mx-auto w-full px-2 sm:px-4 lg:px-8">
			<div v-if="isOwner" class="sm:px-8 sm:py-4 sm:mb-4 bg-background-darker rounded-xl">
				<button
					@click="toNewGame"
					class="flex text-lg z-20 sm:text-xl max-sm:fixed max-sm:p-4 sm:py-2 sm:px-4 bottom-0 right-0 font-semibold capitalize rounded-2xl bg-primary max-sm:m-4 shadow-xl transition duration-150 ease-out hover:bg-primaryVariant hover:scale-110"
				>
					<span class="h-[24px] mr-2 my-auto material-symbols-outlined font-bold">add</span>
					<span class="mr-2">{{$t('buttons.new')}}</span>
				</button>
			</div>
			<GamesLayout :games="games" :profile-id="profile.profileId" />
		</section>

		<!-- Posts -->
		<section v-if="posts && tab === 2" class="max-w-[1600px] mx-auto">
			<NewPostComponent v-if="addingNew" @updatePost="getPosts" @cancel="addingNew = false" />
			<div v-if="!addingNew && isOwner" class="sm:px-8 sm:py-4 sm:mb-4 sm:mx-4 lg:mx-8 bg-background-darker rounded-xl">
				<button
					@click="addingNew = true"
					class="flex text-lg z-20 sm:text-xl max-sm:fixed max-sm:p-4 sm:py-2 sm:px-4 bottom-0 right-0 font-semibold capitalize rounded-2xl bg-primary max-sm:m-4 shadow-xl transition duration-150 ease-out hover:bg-primaryVariant hover:scale-110"
				>
					<span class="h-[24px] mr-2 my-auto material-symbols-outlined font-bold">add</span>
					<span class="mr-2">{{$t('buttons.new')}}</span>
				</button>
			</div>
			<PostsLayout :posts="posts" @updatePost="getPosts" />
		</section>

		<!-- Comments -->
		<section v-if="comments && tab === 3" class="max-w-[1600px] mx-auto">
			<div class="mx-4 sm:mx-4 lg:mx-8 bg-background-darker rounded-xl py-4">
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
import { useMeStore } from '@/stores/me'
import router from "@/router";

export default {
	name: 'ProfileView',
	components: {
		PostsLayout,
		GamesLayout,
		NewPostComponent,
		ProfileInfoComponent,
		CommentsLayout,
	},

	//Setup Pinia storage for @me ownership validation
	setup() {
		const meStore = useMeStore()
		return { meStore }
	},

	//Data keeps track of which profile is being looked at, profile, profiles games, posts and comments, current tab
	data() {
		return {
			paramProfileId: '',
			profile: null,
			games: null,
			posts: null,
			comments: null,

			tab: 1,
			addingNew: false,
		}
	},

	computed: {
		isOwner() {
			return this.meStore.$state.profileId === this.profile.profileId
		},
	},

	methods: {
	  //Get profile from API by the id in the url
		async getProfile() {
			if (this.paramProfileId) {
				axios
					.get('/api/Profile/' + this.paramProfileId)
					.then((response) => {
						this.profile = response.data
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},

		//Get all games from API that belong to the viewed profile
		async getGames() {
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

		//Get all posts from API posted by the viewed profile
		async getPosts() {
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

		//Get all comments from API that where commented by the viewed profile
		async getComments() {
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

		//Pushes router to go new game
		async toNewGame(){
		  await router.push(this.profile.profileId + '/game/new')
		},

		//Get relevant data to profile
		async createdProfile() {
			this.paramProfileId = this.$route.params.profileId
			await this.getProfile()
			await this.getGames()
			await this.getPosts()
			await this.getComments()
		},
	},

	//On view created get relevant data
	created() {
		this.createdProfile()
	},

	watch: {
	  //Watch url and if profile id changes get new profile relevant data (in-case of profile to profile movement)
		'$route.params.profileId': {
			handler() {
				this.createdProfile()
			},
		},
	},
}
</script>
