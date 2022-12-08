<template>
	<!-- Edit comment -->
	<div class="w-full">
		<!-- Edit comment body -->
		<textarea
			v-model="commentDto.content"
			@input="checkValidComment"
			class="w-full bg-background-darker border-b border-background-lightest text-text-default px-2 placeholder:text-text-darker outline-0 focus:border-text-white"
			:maxlength="maxLenght"
			rows="1"
			placeholder="Comment"
			id="newComment"
		></textarea>
		<!-- Edit controls -->
		<transition>
			<div class="w-fit ml-auto" id="buttons">
				<CancelButtonHelper @click="handleCancel" ref="cancelButton" />
				<ButtonHelper @click="editComment" :disabled="!ready" :name="$t('buttons.edit')" />
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

	//Get previous comment to fill textfield
	props: {
		comment: Object,
	},

	//Know if ready and store the Data Transfer Object
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
	  //Handle comment edit cancel by emit to parent
		async handleCancel() {
			this.$emit('cancel')
		},

		//Check comment validity after edit (basically is it empty)
		async checkValidComment() {
			this.autoGrow()
			this.ready = !!this.commentDto.content.length
		},

		//Update edited comment
		async editComment() {
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

		//Autogrow comment text field
		autoGrow() {
			let element = document.getElementById('newComment')
			element.style.height = '5px'
			element.style.height = element.scrollHeight + 4 + 'px'
		},
	},

	//When component is mounted build the comment DTO from previous comment
	mounted() {
		if (this.comment) {
			this.commentDto.content = this.comment.content
			this.commentDto.postId = this.comment.postId
		}
	},
}
</script>
