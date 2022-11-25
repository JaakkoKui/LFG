<template>
	<header
		class="bg-gradient-to-r from-primaryVariant via-primary to-pink-700 mt-2 mx-2 rounded-xl py-16 text-center text-text-white"
	>
		<h1 class="text-6xl font-semibold">Posts</h1>
		<p class="font-semibold text-sm mt-2 italic">Cool posts from all users!</p>
	</header>
	<div class="flex flex-row my-8">
		<section class="flex-1">
			<PostsLayout @updatePost="getPosts" :posts="posts" />
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

	data() {
		return {
			posts: [],
		}
	},

	methods: {
		getPosts() {
			axios
				.get('https://localhost:5001/api/Post')
				.then((response) => {
					this.posts = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		},
	},

	mounted() {
		this.getPosts()
	},
}
</script>
