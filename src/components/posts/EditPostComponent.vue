<template>
	<!-- Post body while editing -->
	<section class="my-8 flex flex-col">
		<input
			id="editPostTitle"
			v-model="postDto.title"
			type="text"
			class="bg-background-darker placeholder:text-text-darker w-full md:w-1/2 xl:w-1/3 outline-0 resize-none overflow-hidden text-2xl font-semibold mb-4 border-b border-background-lighter focus:border-white pb-1"
			placeholder="Title your post"
		/>
		<!--<p class="text-xs opacity-70 mt-1 mb-2">{{ updatePost.title.length }}/{{ titleMax }}</p>-->
		<textarea
			id="editPostContent"
			v-model="postDto.content"
			@input="autoGrow"
			rows="1"
			class="bg-background-darker placeholder:text-text-darker outline-0 resize-none overflow-hidden w-full border-b border-background-lighter focus:border-white"
			placeholder="Write some content to your post"
		></textarea>
		<!--<p class="text-xs opacity-70 mt-1">{{ updatePost.content.length }}/{{ contentMax }}</p>-->
	</section>
</template>

<script>
import axios from 'axios'
export default {
	name: 'EditPostComponent',
	expose: ['editPost', 'clean'],

	props: {
		post: Object,
		executeEdit: Boolean,
	},

	data() {
		return {
			titleMax: 32,
			contentMax: 1024,

			postDto: {
				title: '',
				content: '',
				photoFileName: '',
				numberOfLikes: 0,
				numberOfDislikes: 0,
				numberOfComments: 0,
			},
		}
	},

	methods: {
		autoGrow() {
			let element = document.getElementById('editPostContent')
			element.style.height = '5px'
			element.style.height = element.scrollHeight + 4 + 'px'
		},

		editPost() {
			if (this.post) {
				axios
					.put('https://localhost:5001/api/Post/' + this.post.postId, this.postDto)
					.then(() => {
						this.$emit('done')
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},

		clean() {
			this.postDto = Object.assign({}, this.post)
		},
	},

	created() {
		this.clean()
	},

	mounted() {
		this.autoGrow()
	},
}
</script>
