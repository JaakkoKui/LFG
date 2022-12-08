<template>
	<!-- Post render structure -->
	<div class="w-full flex flex-col gap-y-4 px-2 sm:px-4 lg:px-8 max-w-[1600px] mx-auto">
		<!-- Post -->
		<PostComponent @updatePost="$emit('updatePost')" v-for="post in posts" :key="post.postId" :post="post" />
	</div>
</template>

<script>
import PostComponent from '@/components/posts/PostComponent.vue'

export default {
	name: 'PostsLayout',

	components: {
		PostComponent,
	},

	//Prop passed from parent in order to render the structure
	props: {
		posts: Array,
	},
}
</script>
