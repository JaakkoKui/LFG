<template>
	<div class="md:flex">
		<article class="w-full rounded-xl bg-background-darker p-8 shadow-m relative" :id="post.postId">
			<!-- Post profile header -->
			<PostHeader v-if="profile" :profile="profile" :create-date="post.createDate" :class="{ blur: checkForDelete }" />
			<!-- Post body -->
			<section v-if="!isEditing" class="my-8" :class="{ blur: checkForDelete }">
				<h2 class="font-semibold text-2xl mb-4">{{ post.title }}</h2>
				<p id="content">{{ post.content }}</p>
			</section>

			<EditPostComponent
				v-if="isEditing"
				ref="editPost"
				@done="editDone"
				:post="post"
				:class="{ blur: checkForDelete }"
			/>

			<!-- Post footer -->
			<footer class="flex flex-row-reverse sm:flex-row" :class="{ blur: checkForDelete }">
				<!-- Like buttons -->
				<div id="reactButtons" class="flex bg-background-default w-fit h-fit rounded-full py-2">
					<button class="font-semibold flex border-r-2 border-background-lightest opacity-75 hover:opacity-100">
						<span class="material-symbols-outlined ml-2" id="thumbUp">thumb_up</span>
						<span class="my-auto block mx-2" id="likes">{{ post.numberOfLikes }}</span>
					</button>
					<button class="font-semibold flex opacity-75 hover:opacity-100">
						<span class="my-auto block mx-2" id="dislikes">{{ post.numberOfDislikes }}</span>
						<span class="material-symbols-outlined mr-2" id="thumbDown">thumb_down</span>
					</button>
				</div>
				<!-- Comments button -->
				<button
					@click="handleCommentsButton"
					class="py-1 sm:py-0 mr-auto text-sm sm:text-base sm:mx-4 font-semibold border-2 rounded-xl border-background-default"
					id="comments"
				>
					<span v-if="!commentsOpen" class="px-4 opacity-75 hover:opacity-100" id="numberOfComments"
						>Show {{ post.numberOfComments }} Comments</span
					>
					<span v-if="commentsOpen" class="px-4 opacity-75 hover:opacity-100" id="hideComments">Hide Comments</span>
				</button>
				<!-- Edit controls -->
				<div v-if="isEditing" class="w-fit ml-auto">
					<CancelButtonHelper @click="editCancel" />
					<ButtonHelper @click="submitEdit" name="edit" />
				</div>
			</footer>
			<hr v-if="commentsOpen" class="mt-8 mb-4 border-[1px] border-background-lighter" />
			<!-- Post comments -->
			<section v-if="commentsOpen">
				<h4 class="font-semibold mb-4">{{ post.numberOfComments }} Comments</h4>
				<CommentsLayout @newComment="getComments" :post-id="post.postId" :comments="comments" ref="commentsLayout" />
			</section>
			<!-- Confirm delete -->
			<div v-if="checkForDelete" class="absolute w-full h-full left-0 max-sm:p-8 top-0 flex">
				<div class="m-auto w-fit h-fit">
					<p class="italic font-semibold max-sm:text-center">
						Are you sure you want to delete post "{{ post.title }}" permanently?
					</p>
					<div class="flex max-sm:mx-auto max-sm:w-fit max-sm:flex-col gap-x-4">
						<button
							@click="confirmDelete"
							class="rounded-xl px-8 py-2 font-semibold sm:w-1/2 mt-2 sm:mt-4 hover:text-text-lighter max-sm:order-2"
						>
							Cancel
						</button>
						<button
							@click="deletePost"
							class="bg-red-500 rounded-xl px-8 py-2 font-semibold sm:w-1/2 mt-4 hover:bg-red-600 transition hover:scale-110 duration-200 ease-out"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</article>

		<aside
			v-if="isOwner && !checkForDelete && !isEditing"
			class="shadow-lg rounded-xl bg-background-darker mt-2 md:mt-0 md:ml-2 flex md:flex-col gap-2 p-4"
			:id="post.postId + '-controls'"
		>
			<button
				id="deleteButton"
				@click="confirmDelete"
				class="p-2 md:p-4 w-fit rounded-xl bg-red-500 material-symbols-outlined transition hover:scale-110 hover:bg-red-600 duration-200 ease-out"
			>
				delete
			</button>
			<button
				id="editButton"
				class="p-2 md:p-4 w-fit rounded-xl bg-sky-700 material-symbols-outlined transition hover:scale-110 hover:bg-sky-800 duration-200 ease-out"
				@click="isEditing = !isEditing"
			>
				edit
			</button>
		</aside>
	</div>
</template>

<script>
import axios from 'axios'
import CommentsLayout from '@/layouts/CommentsLayout.vue'
import EditPostComponent from '@/components/posts/EditPostComponent.vue'

import PostHeader from '@/components/posts/PostHeader.vue'
import CancelButtonHelper from '@/helpers/CancelButtonHelper.vue'
import ButtonHelper from '@/helpers/ButtonHelper.vue'

export default {
	name: 'PostComponent',
	components: {
		CommentsLayout,
		EditPostComponent,
		PostHeader,
		CancelButtonHelper,
		ButtonHelper,
	},

	props: {
		post: Object,
	},

	data() {
		return {
			isOwner: false,
			editable: false,
			commentsOpen: false,
			isEditing: false,

			checkForDelete: false,

			profile: {},
			comments: [],
		}
	},

	methods: {
		handleCommentsButton() {
			if (this.commentsOpen) {
				this.commentsOpen = false
			} else {
				this.getComments()
				this.commentsOpen = true
			}
		},

		getProfile() {
			axios
				.get('https://localhost:5001/api/Profile/' + this.post.profileId)
				.then((response) => {
					this.profile = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		},

		getComments() {
			axios
				.get('https://localhost:5001/api/Comment/GetByPostId/' + this.post.postId)
				.then((response) => {
					this.comments = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		},

		//Demo!!!!
		checkOwnerShip() {
			axios
				.get('https://localhost:5001/api/Profile/@me')
				.then((response) => {
					this.isOwner = this.profile.profileId === response.data.profileId
				})
				.catch((error) => {
					console.log(error)
				})
		},

		confirmDelete() {
			this.checkForDelete = !this.checkForDelete

			document.getElementById(this.post.postId).scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			})
		},

		submitEdit() {
			this.$refs.editPost.editPost()
		},

		deletePost() {
			axios
				.delete('https://localhost:5001/api/Post/' + this.post.postId)
				.then(() => {
					this.$emit('updatePost')
				})
				.catch((error) => {
					console.log(error)
				})
		},

		editCancel() {
			this.isEditing = false
			this.$refs.editPost.clean()
		},

		editDone() {
			this.$emit('updatePost')
			this.editCancel()
		},
	},

	mounted() {
		this.getProfile()
	},

	watch: {
		profile() {
			this.checkOwnerShip()
		},
	},
}
</script>
