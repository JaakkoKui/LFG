<template>
	<!-- Post flexbox -->
	<div class="w-full flex flex-col gap-y-5 px-10">
		<!-- Post list render -->
		<div v-for="post in posts" :key="post.postId">
			<PostComponent :post="post" />
			<hr class="w-full border-gray-700" />
		</div>
	</div>
</template>

<script>
import PostComponent from '@/components/posts/PostComponent.vue'

export default {
	name: 'PostsLayout',

	components: {
		PostComponent,
	},

	props: {
		posts: Array,
	},
}
</script>
