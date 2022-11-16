<template>
	<article class="w-full rounded-xl bg-background-darker p-8 shadow-md">
		<header>
			<router-link
				:to="'/profile/' + profile.profileId"
				v-if="profile"
				class="flex text-left mb-4 rounded-full w-fit hover:bg-background-default"
			>
				<AvatarHelper class="h-12" :avatar="profile.avatar" :profile-id="profile.profileId" />
				<div class="mx-4 flex flex-col justify-around">
					<h4 class="font-semibold">{{ profile.nickname }}</h4>
					<p class="opacity-50 text-sm">{{ post.createDate }}</p>
				</div>
			</router-link>
		</header>
		<section class="my-8">
			<h2 class="font-semibold text-2xl capitalize mb-4">{{ post.title }}</h2>
			<p>{{ post.content }}</p>
		</section>
		<footer class="flex">
			<div id="reactButtons" class="flex bg-background-default w-fit h-fit rounded-full py-2">
				<button class="font-semibold flex border-r-2 border-background-lightest opacity-75 hover:opacity-100">
					<span class="material-symbols-outlined ml-2">thumb_up</span>
					<span class="my-auto block mx-2">{{ post.numberOfLikes }}</span>
				</button>
				<button class="font-semibold flex opacity-75 hover:opacity-100">
					<span class="my-auto block mx-2">{{ post.numberOfDislikes }}</span>
					<span class="material-symbols-outlined mr-2">thumb_down</span>
				</button>
			</div>
			<button @click="handleCommentsButton" class="mx-4 font-semibold border-2 rounded-xl border-background-default">
				<span v-if="!commentsOpen" class="px-4 opacity-75 hover:opacity-100"
					>Show {{ post.numberOfComments }} Comments</span
				>
				<span v-if="commentsOpen" class="px-4 opacity-75 hover:opacity-100">Hide Comments</span>
			</button>
		</footer>
		<hr v-if="commentsOpen" class="mt-8 mb-4 border-[1px] border-background-lighter" />
		<section v-if="commentsOpen">
			<h4 class="font-semibold mb-4">{{ post.numberOfComments }} Comments</h4>
			<CommentsLayout :comments="comments" />
		</section>
	</article>
	<!-- <CommentsLayout /> -->
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
		handleCommentsButton() {
			if (this.commentsOpen) {
				this.commentsOpen = false
			} else {
				this.getComments()
				this.commentsOpen = true
			}
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
