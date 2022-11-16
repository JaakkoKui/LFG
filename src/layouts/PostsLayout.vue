<template>
	<!-- Post flexbox -->
	<div class="w-full flex flex-col gap-y-4 px-8">
		<!-- Post list render -->
		<PostComponent v-for="post in posts" :key="post.postId" :post="post" />
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
