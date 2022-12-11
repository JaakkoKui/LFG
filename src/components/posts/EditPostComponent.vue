<template>
	<!-- Post body while editing -->
	<section class="my-8 flex flex-col">
		<!--Edit post title-->
		<input
			id="editPostTitle"
			v-model="postDto.title"
			type="text"
			class="bg-background-darker placeholder:text-text-darker w-full md:w-1/2 xl:w-1/3 outline-0 resize-none overflow-hidden text-2xl font-semibold mb-4 border-b border-background-lighter focus:border-white pb-1"
			:placeholder="$t('posts.placeholderTitle')"
	  	:maxlength="titleMax"
		/>
		<!--Edit post content-->
		<textarea
			id="editPostContent"
			v-model="postDto.content"
			@input="autoGrow"
			rows="1"
			class="bg-background-darker placeholder:text-text-darker outline-0 resize-none overflow-hidden w-full border-b border-background-lighter focus:border-white"
			:placeholder="$t('posts.placeholderContent')"
			:maxlength="contentMax"
		></textarea>
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

	//Keep post Data Transfer Object
	data() {
		return {
			titleMax: 45,
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
	  //Grow textfield when space runs out
		autoGrow() {
			let element = document.getElementById('editPostContent')
			element.style.height = '5px'
			element.style.height = element.scrollHeight + 4 + 'px'
		},

		//Pass edit to API
		async editPost() {
			if (this.post) {
				axios
					.put('/api/Post/' + this.post.postId, this.postDto)
					.then(() => {
						this.$emit('done')
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},

		//Clean the DTO with a fresh one
		async clean() {
			this.postDto = Object.assign({}, this.post)
		},
	},

	//On create clean DTO
	created() {
		this.clean()
	},

	//Auto adjust to edit size on component mount
	mounted() {
		this.autoGrow()
	},
}
</script>
