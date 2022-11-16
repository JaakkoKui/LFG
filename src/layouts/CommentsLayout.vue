<template>
	<section class="ml-8">
		<NewCommentComponent />
		<div v-for="(comment, key) in comments" :key="key" class="flex flex-col gap-y-8 mt-4">
			<CommentComponent :comment="comment" :profile-id="comment.profileId" />
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
	},
}
</script>
