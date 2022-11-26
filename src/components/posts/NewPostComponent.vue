<template>
	<div class="border-background-lighter pt-8 pb-4 mb-4 px-8 mx-2 sm:mx-4 lg:mx-8 bg-background-darker rounded-xl">
		<PostHeader :profile="profile" ref="postHeader"/>
		<div class="flex">
			<input
				id="newPostTitle"
				v-model="postDto.title"
				type="text"
				class="bg-background-darker placeholder:text-text-darker w-full md:w-1/2 xl:w-1/3 outline-0 resize-none overflow-hidden text-xl font-semibold mb-4 border-b border-background-lighter focus:border-white pb-1"
				placeholder="Title your post"
			/>
			<!-- <p class="text-sm opacity-70 mt-auto ml-4">{{ title.length }}/{{ titleMax }}</p> -->
		</div>
		<div class="flex">
			<textarea
				id="newPostContent"
				v-model="postDto.content"
				@input="autoGrow"
				rows="1"
				class="bg-background-darker placeholder:text-text-darker outline-0 resize-none overflow-hidden w-full border-b border-background-lighter focus:border-white"
				placeholder="Write some content to your post"
			></textarea>
			<!--<p class="text-sm opacity-70 mt-auto ml-4">{{ content.length }}/{{ contentMax }}</p>-->
		</div>
		<div id="newPostButtons" class="ml-auto mt-4 w-fit">
			<CancelButtonHelper @click="cancelNew" ref="cancelButton"/>
			<ButtonHelper @click="postPost" name="Post" :disabled="!postDto.title || !postDto.content" ref="postButton"/>
		</div>
	</div>
</template>

<script>
import ButtonHelper from '@/helpers/ButtonHelper.vue'
import CancelButtonHelper from '@/helpers/CancelButtonHelper.vue'
import PostHeader from '@/components/posts/PostHeader.vue'
import axios from 'axios'

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

	data() {
		return {
			titleMax: 32,
			contentMax: 1024,
			textBoxRows: 1,

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
		cancelNew() {
			this.$emit('cancel')
		},

		autoGrow() {
			let element = document.getElementById('newPostContent')
			element.style.height = '5px'
			element.style.height = element.scrollHeight + 4 + 'px'
		},

		//Demo!!!!
		getMe() {
			axios
				.get('https://localhost:5001/api/Profile/@me')
				.then((response) => {
					this.profile = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		},

		postPost() {
			if (this.postDto.content && this.postDto.title) {
				axios
					.post('https://localhost:5001/api/Post', this.postDto)
					.then(() => {
						this.$emit('updateComments')
						this.cancelNew()
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},
	},

	mounted() {
		this.getMe()
	},
}
</script>

<style scoped></style>
