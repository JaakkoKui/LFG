<template>
	<div class="md:flex">
		<article class="w-full rounded-xl bg-background-darker p-8 shadow-m relative" :id="post.postId">
			<!-- Post profile header -->
			<PostHeader
				v-if="profile"
				:id="post.postId + '-header'"
				:profile="profile"
				:create-date="post.createDate"
				:class="{ blur: checkForDelete }"
			/>

			<!-- Post body -->
			<section v-if="!isEditing" :id="post.postId + '-content'" class="my-8" :class="{ blur: checkForDelete }">
				<h2 class="font-semibold text-2xl mb-4">{{ post.title }}</h2>
				<p id="content" style="display: inline-block; word-break: break-word">{{ post.content }}</p>
			</section>

			<!-- Edit post body -->
			<EditPostComponent
				v-if="isEditing"
				ref="editPost"
				@done="editDone"
				:post="post"
				:class="{ blur: checkForDelete }"
			/>

			<!-- Post footer -->
			<footer class="sm:flex" :class="{ blur: checkForDelete }">

				<!-- Edit controls -->
				<div v-if="isEditing" class="w-fit ml-auto max-sm:mb-4 sm:order-3">
					<CancelButtonHelper @click="editCancel"/>
					<ButtonHelper @click="submitEdit" :name="$t('buttons.edit')"/>
				</div>

				<section class="flex flex-row-reverse sm:flex-row">
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
							>{{ $t('posts.showComments', {numberOfComments: numberOfComments}) }}</span
							>
						<span v-if="commentsOpen" class="px-4 opacity-75 hover:opacity-100"
									id="hideComments">{{ $t('posts.hideComments') }}</span>
					</button>
				</section>
			</footer>
			<hr v-if="commentsOpen" class="mt-8 mb-4 border-[1px] border-background-lighter"/>
			<!-- Post comments -->
			<section v-if="commentsOpen">
				<h4 class="font-semibold mb-4">{{ numberOfComments }} {{ $t('posts.comments') }}</h4>
				<CommentsLayout
					@updateComments="getComments"
					:post-id="post.postId"
					:comments="comments"
					ref="commentsLayout"
				/>
			</section>
			<!-- Confirm delete -->
			<div v-if="checkForDelete" class="absolute w-full h-full left-0 max-sm:p-8 top-0 flex">
				<div class="m-auto w-fit h-fit">
					<p class="italic font-semibold max-sm:text-center">
						{{ $t('posts.deleteConfirmation') }}
					</p>
					<div class="flex max-sm:mx-auto max-sm:w-fit max-sm:flex-col gap-x-4">
						<button
							@click="confirmDelete"
							class="rounded-xl px-8 py-2 font-semibold sm:w-1/2 mt-2 sm:mt-4 hover:text-text-lighter max-sm:order-2"
						>
							{{ $t('buttons.cancel') }}
						</button>
						<button
							@click="deletePost"
							class="bg-red-500 rounded-xl px-8 py-2 font-semibold sm:w-1/2 mt-4 hover:bg-red-600 transition hover:scale-110 duration-200 ease-out"
						>
							{{ $t('buttons.delete') }}
						</button>
					</div>
				</div>
			</div>
		</article>

		<!-- Post controls -->
		<aside
			v-if="isOwner && !checkForDelete && !isEditing"
			class="shadow-lg rounded-xl bg-background-darker mt-2 md:mt-0 md:ml-2 flex md:flex-col gap-2 p-4"
			:id="post.postId + '-controls'"
		>
			<button
				:id="post.postId + '-deleteButton'"
				@click="confirmDelete"
				class="p-2 md:p-4 w-fit rounded-xl bg-red-500 material-symbols-outlined transition hover:scale-110 hover:bg-red-600 duration-200 ease-out"
			>
				delete
			</button>
			<button
				:id="post.postId + '-editButton'"
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
import {useMeStore} from '@/stores/me'

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

	//Setup pinia storage
	setup() {
		const meStore = useMeStore()
		return {meStore}
	},

	//Keep track of states (if editing)
	data() {
		return {
			editable: false,
			commentsOpen: false,
			isEditing: false,

			numberOfComments: 0,

			checkForDelete: false,

			profile: {},
			comments: [],
		}
	},

	computed: {
		//Check ownership from Pinia
		isOwner() {
			if (this.meStore.$state.profileId) {
				return this.meStore.$state.profileId === this.profile.profileId
			}
		},
	},

	methods: {
		//Get comments if user decides to look at the comments
		async handleCommentsButton() {
			if (this.commentsOpen) {
				this.commentsOpen = false
			} else {
				await this.getComments()
				this.commentsOpen = true
			}
		},

		//Get posters profile from API
		async getProfile() {
			axios
				.get('/api/Profile/' + this.post.profileId)
				.then((response) => {
					this.profile = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		},

		//Get comments by post from API
		async getComments() {
			axios
				.get('/api/Comment/GetByPostId/' + this.post.postId)
				.then((response) => {
					this.comments = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		},

		//Check if user is sure about deleting
		confirmDelete() {
			this.commentsOpen = false
			this.checkForDelete = !this.checkForDelete

			document.getElementById(this.post.postId + '-content').scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			})
		},

		//Submit a post edit
		async submitEdit() {
			this.$refs.editPost.editPost()
		},

		//Delete selected post
		async deletePost() {
			axios
				.delete('/api/Post/' + this.post.postId)
				.then(() => {
					this.$emit('updatePost')
				})
				.catch((error) => {
					console.log(error)
				})
		},

		//Gets the number of comments that belong to this post from API
		async getNumberOfComments() {
			axios
				.get('/api/Comment/GetTableSizeByPostId/' + this.post.postId)
				.then((response) => {
					this.numberOfComments = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		},

		//Cancel an edit
		editCancel() {
			this.isEditing = false
			this.$refs.editPost.clean()
		},

		//When edit is done, emit to parent so the edit can be updated to show
		editDone() {
			this.$emit('updatePost')
			this.editCancel()
		},
	},

	//Get poster profile when post is beginning to render
	mounted() {
		this.getProfile()
		if(this.post){
	  	this.getNumberOfComments()
		}
	},
}
</script>
