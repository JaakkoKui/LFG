<template>
	<div class="flex w-full py-5">
		<!-- Poster Avatar -->
		<div class="mx-5 w-[50px]">
			<AvatarHelper :avatar="profile.avatar" :profile-id="profile.profileId" />
		</div>

		<!-- Post body -->
		<div class="w-[calc(100%-200px)]">
			<!-- Post header -->
			<div v-if="profile" class="flex h-[50px]">
				<router-link :to="'/profile/' + profile.profileId" class="text-md font-bold hover:text-white">
					{{ profile.nickname }}
				</router-link>
				<h4 class="text-sm italic font-semibold text-gray-400 pt-0.5 ml-3">
					{{ post.createDate }}
				</h4>
			</div>

			<!-- Post content -->
			<div class="mb-5">
				<h1 class="break-words text-xl font-bold mb-2">{{ post.title }}</h1>
				<p>{{ post.content }}</p>
			</div>

			<!-- Post footter -->
			<div>
				<button v-if="!commentsOpen" class="font-semibold text-gray-400 mb-1.5" @click="handleCommentsOpen">
					<p v-if="post.numberOfComments > 0">Show {{ post.numberOfComments }} Comments</p>
					<p v-else>Be First To Comment</p>
				</button>

				<button v-if="commentsOpen" class="font-semibold text-gray-400 mb-1.5" @click="commentsOpen = false">
					Hide Comments
				</button>

				<div class="flex mt-auto text-gray-400">
					<p class="border-r pr-2.5 border-gray-400">{{ post.numberOfComments }} likes</p>
					<p class="pl-2.5">{{ post.numberOfDislikes }} dislikes</p>
				</div>
			</div>

			<CommentsLayout v-if="commentsOpen" :comments="comments" />
		</div>

		<!-- Post aside -->
		<aside class="flex flex-col justify-between h-16 px-5 pt-2 text-gray-400">
			<!-- Edit and delete buttons (shown within profile view) -->
			<button v-if="isOwner" class="w-[50px] hover:text-white">Edit</button>
			<button v-if="isOwner" class="w-[50px] text-red-500 hover:text-red-700">Delete</button>

			<!-- Like buttons (disabled if viewer owns the post or is not logged in) -->
			<button v-if="!isOwner" class="w-[50px] hover:text-white" @click="like">
				<span class="material-symbols-outlined">thumb_up</span>
			</button>
			<button v-if="!isOwner" class="w-[50px] hover:text-white" @click="dislike">
				<span class="material-symbols-outlined">thumb_down</span>
			</button>
		</aside>
	</div>
</template>

<script>
import axios from 'axios'
import CommentsLayout from '@/layouts/CommentsLayout.vue'

import AvatarHelper from '../../helpers/AvatarHelper.vue'

export default {
	name: 'PostComponent',
	components: {
		AvatarHelper,
		CommentsLayout,
	},

	props: {
		post: Object,
	},

	data() {
		return {
			isOwner: false,
			editable: false,
			commentsOpen: false,

			profile: {},
			comments: [],
		}
	},

	methods: {
		handleCommentsOpen() {
			this.getComments()
			this.commentsOpen = true
		},

		getProfile() {
			axios.get('https://localhost:5001/api/Profile/' + this.post.profileId).then((response) => {
				this.profile = response.data
			})
		},

		getComments() {
			axios.get('https://localhost:5001/api/Comment/GetByPostId/' + this.post.postId).then((response) => {
				this.comments = response.data
			})
		},
	},

	mounted() {
		this.getProfile()
	},
}
</script>
