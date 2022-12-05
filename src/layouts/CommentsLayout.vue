<template>
	<section class="mx-4 sm:mx-8 lg:w-1/2" :class="{ 'lg:mr-0': postId }">
		<NewCommentComponent v-if="postId" @updateComments="$emit('updateComments')" :post-id="postId" />
		<div v-for="(comment, key) in comments" :key="key" class="flex flex-col gap-y-8 my-4">
			<CommentComponent @updateComments="$emit('updateComments')" :comment="comment" />
		</div>
	</section>
</template>

<script>
import CommentComponent from '../components/comments/CommentComponent.vue'
import NewCommentComponent from '@/components/comments/NewCommentComponent.vue'

export default {
	name: 'CommentLayout',

	components: {
		CommentComponent,
		NewCommentComponent,
	},

	props: {
		comments: Array,
		postId: String,
	},
}
</script>
