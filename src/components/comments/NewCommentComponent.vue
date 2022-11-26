<template>
	<!-- New comment -->
	<div v-if="me" class="my-4 flex">
		<div class="min-w-[35px] w-[35px] h-[35px] mr-2">
			<AvatarHelper :avatar="me.avatar" :profile-id="me.profileId" />
		</div>
		<div class="w-full">
			<textarea
				v-model="text"
				@focus="showButtons"
				@input="checkValidComment"
				class="w-full bg-background-darker border-b border-background-lightest text-text-default px-2 placeholder:text-text-darker outline-0 focus:border-text-white"
				:maxlength="maxLenght"
				rows="1"
				placeholder="Comment"
				id="newComment"
			></textarea>
			<transition>
				<div v-if="active" class="w-fit ml-auto mt-2" id="buttons">
					<CancelButtonHelper @click="handleCancel" ref="cancelButton" />
					<ButtonHelper @click="postComment" :disabled="!ready" name="comment" />
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import AvatarHelper from '../../helpers/AvatarHelper.vue'
import ButtonHelper from '@/helpers/ButtonHelper.vue'
import CancelButtonHelper from '@/helpers/CancelButtonHelper.vue'
import axios from 'axios'

export default {
	name: 'NewCommentComponent',
	components: {
		CancelButtonHelper,
		AvatarHelper,
		ButtonHelper,
	},

	props: {
		postId: String,
	},

	data() {
		return {
			maxLenght: 250,
			active: false,
			ready: false,

			text: '',

			me: null,
		}
	},

	methods: {
		handleCancel() {
			this.text = ''
			this.active = false
		},

		checkValidComment() {
			this.autoGrow()
			this.ready = !!this.text.length
		},

		showButtons() {
			this.active = true
		},

		postComment() {
			if (this.ready && this.postId) {
				const commentDto = {
					content: this.text,
					postId: this.postId,
				}

				axios
					.post('https://localhost:5001/api/Comment', commentDto)
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

		getMe() {
			axios
				.get('https://localhost:5001/api/Profile/@me')
				.then((response) => {
					this.me = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		},

		autoGrow() {
			let element = document.getElementById('newComment')
			element.style.height = '5px'
			element.style.height = element.scrollHeight + 4 + 'px'
		},
	},

	mounted() {
		this.getMe()
	},
}
</script>

<style>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
