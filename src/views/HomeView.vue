<template>
	<header
		class="bg-gradient-to-r from-primaryVariant via-primary to-pink-700 m-2 rounded-xl py-16 text-center text-text-white"
	>
		<h1 class="text-6xl font-semibold">Posts</h1>
		<p class="font-semibold text-sm mt-2 italic">Cool posts from all users!</p>
	</header>
	<div class="flex flex-row my-8">
		<section class="flex-1">
			<PostsLayout :posts="posts" />
		</section>
		<!--
		<aside class="w-96 min-h-full shrink-0 bg-background-darker mr-8 rounded-xl py-4 px-8">
			<button
				class="w-full rounded-full bg-primary py-2 px-4 w-fit text-text-white capitalize font-semibold hover:bg-primaryVariant transition ease-out duration-200"
			>
				<span> New Post </span>
			</button>
		</aside>
		--></div>
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
