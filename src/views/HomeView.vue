<template>
	<div class="mt-5">
		<div class="font-bold ml-10 my-5 border-b-4 border-gray-300 text-3xl w-[calc(100%-100px)]">
			<h1 class="bg-darkBackground pr-5 -mb-4 w-fit">Posts</h1>
		</div>
		<PostsLayout :posts="posts" />
	</div>
</template>

<script>
import axios from 'axios'
import PostsLayout from '@/layouts/PostsLayout.vue'

export default {
	name: 'HomeView',
	components: { PostsLayout },

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
