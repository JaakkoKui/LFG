<template>
	<div class="border-background-lighter pt-8 pb-4 mb-4 px-8 mx-2 sm:mx-4 lg:mx-8 bg-background-darker rounded-xl">
		<!-- Post header aka. profile name and profile etc -->
		<PostHeader :profile="profile" ref="postHeader" />
		<!-- New post title input textfield -->
		<div class="flex">
			<input
				id="newPostTitle"
				v-model="postDto.title"
				type="text"
				class="bg-background-darker placeholder:text-text-darker w-full md:w-1/2 xl:w-1/3 outline-0 resize-none overflow-hidden text-xl font-semibold mb-4 border-b border-background-lighter focus:border-white pb-1"
				placeholder="Title your post"
				:maxlength="titleMax"
			/>
		</div>
		<!-- New post content body textfield -->
		<div class="flex">
			<textarea
				id="newPostContent"
				v-model="postDto.content"
				@input="autoGrow"
				rows="1"
				class="bg-background-darker placeholder:text-text-darker outline-0 resize-none overflow-hidden w-full border-b border-background-lighter focus:border-white"
				placeholder="Write some content to your post"
				:maxlength="contentMax"
			></textarea>
		</div>
		<div id="newPostButtons" class="ml-auto mt-4 w-fit">
			<CancelButtonHelper @click="cancelNew" ref="cancelButton" />
			<ButtonHelper @click="postPost" name="Post" :disabled="!postDto.title || !postDto.content" ref="postButton" />
		</div>
	</div>
</template>

<script>
import ButtonHelper from '@/helpers/ButtonHelper.vue'
import CancelButtonHelper from '@/helpers/CancelButtonHelper.vue'
import PostHeader from '@/components/posts/PostHeader.vue'
import axios from 'axios'
import { useMeStore } from '@/stores/me'

export default {
	name: 'NewPostComponent',

	props: {
		addingNew: Boolean,
	},

	components: {
		ButtonHelper,
		CancelButtonHelper,
		PostHeader,
	},

	setup() {
		const meStore = useMeStore()

		return { meStore }
	},

	data() {
		return {
			titleMax: 45,
			contentMax: 1024,

			postDto: {
				title: '',
				content: '',
				photoFileName: null,
				numberOfLikes: 0,
				numberOfDislikes: 0,
				numberOfComments: 0,
			},
			profile: {},
		}
	},

	methods: {
	  //Emit cancel to parent
		cancelNew() {
			this.$emit('cancel')
		},

		//Autogrow textfield if runs out of space
		autoGrow() {
			let element = document.getElementById('newPostContent')
			element.style.height = '5px'
			element.style.height = element.scrollHeight + 4 + 'px'
		},

		//Sets profile to your current profile
		async getMe() {
			this.profile = this.meStore.$state
		},

		//Post new post to API
		async postPost() {
			if (this.postDto.content && this.postDto.title) {
				axios
					.post('https://localhost:5001/api/Post', this.postDto)
					.then(() => {
						this.$emit('updatePost')
						this.cancelNew()
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},
	},

	//On creation, get your profile
	created() {
		this.getMe()
	},
}
</script>

<style scoped></style>
