<template>
	<div class="md:flex">
		<article class="w-full rounded-xl bg-background-darker p-8 shadow-m">
			<!-- Post profile header -->
			<header>
				<router-link
					:to="'/profile/' + profile.profileId"
					v-if="profile"
					class="flex text-left mb-4 rounded-full w-fit hover:bg-background-default transition duration-150 ease-out"
				>
					<AvatarHelper class="h-12" :avatar="profile.avatar" :profile-id="profile.profileId" />
					<div class="mx-4 flex flex-col justify-around">
						<h4 class="font-semibold" id="nickname">{{ profile.nickname }}</h4>
						<p class="opacity-50 text-sm" id="date">{{ post.createDate }}</p>
					</div>
				</router-link>
			</header>
			<!-- Post body -->
			<section class="my-8">
				<h2 class="font-semibold text-2xl capitalize mb-4">{{ post.title }}</h2>
				<p id="content">{{ post.content }}</p>
			</section>
			<!-- Post footer -->
			<footer class="flex flex-row-reverse sm:flex-row">
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
				<button
					@click="handleCommentsButton"
					class="py-1 sm:py-0 mr-auto text-sm sm:text-base sm:mx-4 font-semibold border-2 rounded-xl border-background-default"
				id="comments">
					<span v-if="!commentsOpen" class="px-4 opacity-75 hover:opacity-100"
						id="numberOfComments">Show {{ post.numberOfComments }} Comments</span
					>
					<span v-if="commentsOpen" class="px-4 opacity-75 hover:opacity-100" id="hideComments">Hide Comments</span>
				</button>
			</footer>
			<hr v-if="commentsOpen" class="mt-8 mb-4 border-[1px] border-background-lighter" />
			<!-- Post comments -->
			<section v-if="commentsOpen">
				<h4 class="font-semibold mb-4">{{ post.numberOfComments }} Comments</h4>
				<CommentsLayout @newComment="getComments" :post-id="post.postId" :comments="comments" ref="commentsLayout"/>
			</section>
		</article>

		<div
			v-if="isOwner"
			class="shadow-lg rounded-xl bg-background-darker mt-2 md:mt-0 md:ml-2 flex md:flex-col gap-2 p-4"
			id="ownerButtons"
		>
			<button
				id="deleteButton"
				class="p-2 md:p-4 w-fit rounded-xl bg-red-500 material-symbols-outlined transition hover:scale-110 hover:bg-red-600 duration-200 ease-out"
			>
				delete
			</button>
			<button
				id="editButton"
				class="p-2 md:p-4 w-fit rounded-xl bg-sky-700 material-symbols-outlined transition hover:scale-110 hover:bg-sky-800 duration-200 ease-out"
			>
				edit
			</button>
		</div>
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

		delete() {
			console.log('delete')
		},

		edit() {
			console.log('edit')
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
