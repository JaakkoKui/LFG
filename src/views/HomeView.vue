<template>
	<!-- Home post header -->
	<header
		class="bg-gradient-to-r from-primaryVariant via-primary to-pink-700 mt-2 mx-2 rounded-xl py-16 text-center text-text-white"
	>
		<h1 class="text-6xl font-semibold">{{ $t("main.header.title") }}</h1>
		<p class="font-semibold text-sm mt-2 italic">{{ $t("main.header.description") }}</p>
	</header>
	<!-- All posts -->
	<div class="flex flex-row my-4 lg:my-8">
		<section class="flex-1">
			<!-- Posts layout, if changes are made in the layouts data, it is reloaded -->
			<PostsLayout @updatePost="getPosts" :posts="posts"/>
		</section>
	</div>
</template>

<script>
import axios from 'axios'
import PostsLayout from '@/layouts/PostsLayout.vue'

export default {
	name: 'HomeView',
	components: {
		PostsLayout,
	},

	//Data for the list of posts
	data() {
		return {
			posts: [],
		}
	},

	methods: {
		//Get all posts from API
		async getPosts() {
			axios
				.get('/api/Post')
				.then((response) => {
					this.posts = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		},
	},

	//When view is created this will get posts from API
	created() {
		this.getPosts()
	},
}
</script>
