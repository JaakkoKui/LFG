<template>
	<div class="w-full">
		<textarea
			v-model="commentDto.content"
			@input="checkValidComment"
			class="w-full bg-background-darker border-b border-background-lightest text-text-default px-2 placeholder:text-text-darker outline-0 focus:border-text-white"
			:maxlength="maxLenght"
			rows="1"
			placeholder="Comment"
			id="newComment"
		></textarea>
		<transition>
			<div class="w-fit ml-auto" id="buttons">
				<CancelButtonHelper @click="handleCancel" ref="cancelButton" />
				<ButtonHelper @click="editComment" :disabled="!ready" name="Edit" />
			</div>
		</transition>
	</div>
</template>

<script>
import ButtonHelper from '../../helpers/ButtonHelper.vue'
import CancelButtonHelper from '../../helpers/CancelButtonHelper.vue'
import axios from 'axios'

export default {
	name: 'NewCommentComponent',

	components: {
		ButtonHelper,
		CancelButtonHelper,
	},

	props: {
		comment: Object,
	},

	data() {
		return {
			maxLenght: 250,
			ready: true,

			commentDto: {
				content: '',
				postId: '',
			},
		}
	},

	methods: {
		handleCancel() {
			this.$emit('cancel')
		},

		checkValidComment() {
			this.autoGrow()
			this.ready = !!this.commentDto.content.length
		},

		editComment() {
			if (this.commentDto.content.length > 0 && this.commentDto.postId) {
				axios
					.put('/api/Comment/' + this.comment.commentId, this.commentDto)
					.then(() => {
						this.handleCancel()
						this.$emit('updateComments')
					})
					.catch((error) => {
						console.log(error)
					})
			} else {
				console.error('Failed to send comment')
			}
		},

		autoGrow() {
			let element = document.getElementById('newComment')
			element.style.height = '5px'
			element.style.height = element.scrollHeight + 4 + 'px'
		},
	},

	mounted() {
		if (this.comment) {
			this.commentDto.content = this.comment.content
			this.commentDto.postId = this.comment.postId
		}
	},
}
</script>

<style scoped></style>
