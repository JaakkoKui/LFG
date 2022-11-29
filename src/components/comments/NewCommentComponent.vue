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
import { useMeStore } from '@/stores/me'

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

	setup() {
		const meStore = useMeStore()

		return { meStore }
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

		async checkValidComment() {
			this.autoGrow()
			this.ready = !!this.text.length
		},

		async showButtons() {
			this.active = true
		},

		async postComment() {
			if (this.ready && this.postId) {
				const commentDto = {
					content: this.text,
					postId: this.postId,
				}

				axios
					.post('/api/Comment', commentDto)
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

		async getMe() {
			this.me = this.meStore.$state
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
