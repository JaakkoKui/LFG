<template>
	<article v-if="profile" class="flex relative" id="comment">
		<div class="min-w-[35px] w-[35px] h-[35px]">
			<AvatarHelper :avatar="profile.avatar" :profile-id="profile.profileId" />
		</div>

		<div>
			<div class="flex">
				<router-link
					:to="'/profile/' + profile.profileId"
					class="hover:bg-background-default rounded-full font-semibold h-fit px-2"
					id="nickname"
					>{{ profile.nickname }}</router-link
				>
				<h6 class="italic text-xs mt-1 opacity-70" id="date">{{ comment.date }}</h6>
				<button
					v-if="!menu && isOwner"
					class="material-symbols-outlined ml-2 opacity-70 hover:opacity-100 transition duration-150"
					@click="menu = true"
				>
					more_horiz
				</button>
				<!-- Menu -->
				<section
					v-if="menu && !deleting"
					class="ml-2 rounded-md bg-background-default flex flex-col h-fit w-80 absolute z-10 border border-background-lighter"
				>
					<button
						@click=";(editing = true), (menu = false)"
						class="px-2 py-2 capitalize hover:bg-background-lighter flex rounded-t-md"
					>
						<span class="material-symbols-outlined">edit</span>
						<span class="ml-2">Edit</span>
					</button>
					<button @click="deleting = true" class="px-2 py-2 capitalize hover:bg-background-lighter flex">
						<span class="material-symbols-outlined">delete</span>
						<span class="ml-2">Delete</span>
					</button>
					<button
						@click="menu = false"
						class="px-2 py-2 capitalize hover:bg-background-lighter flex border-t border-background-lighter rounded-b-md"
					>
						<span class="material-symbols-outlined">arrow_back</span>
						<span class="ml-2">Cancel</span>
					</button>
				</section>
				<!-- Delete confirmation -->
				<section
					v-if="menu && deleting"
					class="ml-2 rounded-md bg-background-default flex flex-col h-fit w-80 absolute z-10 border border-background-lighter"
				>
					<div class="px-2 py-2 border-b border-background-lighter">
						<p>Are you sure you want to delete this comment permanently?</p>
					</div>
					<button @click="deleteComment" class="px-2 py-2 capitalize hover:bg-background-lighter flex">
						<span class="material-symbols-outlined text-red-500">delete</span>
						<span class="ml-2 text-red-500">Delete</span>
					</button>
					<button
						@click="deleting = false"
						class="px-2 py-2 capitalize hover:bg-background-lighter flex border-t border-background-lighter rounded-b-md"
					>
						<span class="material-symbols-outlined">arrow_back</span>
						<span class="ml-2">Cancel</span>
					</button>
				</section>
			</div>
			<div>
				<p v-if="!editing" class="ml-[7px]" style="display: inline-block; word-break: break-word">
					{{ comment.content }}
				</p>
				<EditCommentComponent
					v-if="editing"
					@cancel="editing = false"
					:comment="comment"
					@updateComments="$emit('updateComments')"
				/>
			</div>
		</div>
	</article>
</template>

<script>
import AvatarHelper from '@/helpers/AvatarHelper.vue'
import EditCommentComponent from '@/components/comments/EditCommentComponent.vue'
import axios from 'axios'
import { useMeStore } from '@/stores/me'

export default {
	name: 'CommentComponent',
	components: { AvatarHelper, EditCommentComponent },

	props: {
		comment: Object,
	},

	setup() {
		const meStore = useMeStore()

		return { meStore }
	},

	data() {
		return {
			profile: {},
			menu: false,
			deleting: false,
			editing: false,
		}
	},

	computed: {
		isOwner() {
			return this.meStore.$state.profileId === this.profile.profileId
		},
	},

	methods: {
		async getProfile() {
			if (this.comment) {
				axios.get('/api/Profile/' + this.comment.profileId).then((response) => {
					this.profile = response.data
				})
			}
		},

		async deleteComment() {
			if (this.comment) {
				axios
					.delete('/api/Comment/' + this.comment.commentId)
					.then(() => {
						this.menu = false
						this.$emit('updateComments')
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},
	},

	mounted() {
		this.getProfile()
	},

	watch: {
		comment: {
			handler() {
				this.getProfile()
			},
		},
	},
}
</script>
