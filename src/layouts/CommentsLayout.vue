<template>
	<NewCommentComponent />
	<div v-for="(comment, key) in comments" :key="key">
		<CommentComponent :comment="comment" :profile-id="comment.profileId" />
	</div>
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
