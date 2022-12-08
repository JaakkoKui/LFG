<template>
	<!-- New comment -->
	<div v-if="me" class="my-4 flex">
		<!-- New comment profile -->
		<div class="min-w-[35px] w-[35px] h-[35px] mr-2">
			<AvatarHelper :avatar="me.avatar" :profile-id="me.profileId" />
		</div>
		<div class="w-full">
			<!-- New comment body -->
			<textarea
				v-model="text"
				@focus="showButtons"
				@input="checkValidComment"
				class="w-full bg-background-darker border-b border-background-lightest text-text-default px-2 placeholder:text-text-darker outline-0 focus:border-text-white"
				:maxlength="maxLenght"
				rows="1"
				:placeholder="$t('comments.comment')"
				id="newComment"
			></textarea>
			<transition>
				<div v-if="active" class="w-fit ml-auto mt-2" id="buttons">
					<CancelButtonHelper @click="handleCancel" ref="cancelButton" />
					<ButtonHelper @click="postComment" :disabled="!ready" :name="$t('buttons.comment')" />
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

	//Get postId from the comment parenting post
	props: {
		postId: String,
	},

	//Setup pinia storage
	setup() {
		const meStore = useMeStore()
		return { meStore }
	},

	//Know comment profile, Know if comment is active and ready to send. In addition have the comment text ready.
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
	  //Handle new comment cancel
		handleCancel() {
			this.text = ''
			this.active = false
		},

		//Check comment validity aka. if comment has any text and autogrow and auto enable buttons
		async checkValidComment() {
			this.autoGrow()
			this.ready = !!this.text.length
		},

		//Show comment controls if new comment has been interacted with
		async showButtons() {
			this.active = true
		},

		//Post Comment
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

		//Get your profile from Pinia
		async getMe() {
		  if(this.meStore.$state.profileId){
				this.me = this.meStore.$state
			} else {
				this.me = null
			}
		},

		//Autogrow comment text field
		autoGrow() {
			let element = document.getElementById('newComment')
			element.style.height = '5px'
			element.style.height = element.scrollHeight + 4 + 'px'
		},
	},

	//When comment component is mounted, get your profile
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
