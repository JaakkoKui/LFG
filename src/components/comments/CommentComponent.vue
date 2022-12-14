<template>
	<article v-if="profile" class="flex relative" id="comment">
		<div class="min-w-[35px] w-[35px] h-[35px]">
			<AvatarHelper :avatar="profile.avatar" :profile-id="profile.profileId"/>
		</div>

		<div class="block w-full">
			<div class="flex">

				<!-- Commentor profile link -->
				<router-link
					:to="'/profile/' + profile.profileId"
					class="hover:bg-background-default rounded-full font-semibold h-fit px-2"
					id="nickname"
				>{{ profile.nickname }}
				</router-link
				>

				<!-- Comment comment date -->
				<h6 class="italic text-xs mt-1 opacity-70" id="date">{{ simpliTime }}</h6>

				<!-- Menu button -->
				<button
					v-if="!menu && isOwner"
					class="material-symbols-outlined ml-2 opacity-70 hover:opacity-100 transition duration-150"
					@click="menu = true"
				>
					more_horiz
				</button>

				<!-- Comment controls menu -->
				<section
					v-if="menu && !deleting"
					class="ml-2 rounded-md bg-background-default flex flex-col h-fit w-80 absolute z-10 border border-background-lighter"
				>
					<button
						@click=";(editing = true), (menu = false)"
						class="px-2 py-2 capitalize hover:bg-background-lighter flex rounded-t-md"
					>
						<span class="material-symbols-outlined">edit</span>
						<span class="ml-2">{{ $t('buttons.edit') }}</span>
					</button>
					<button @click="deleting = true" class="px-2 py-2 capitalize hover:bg-background-lighter flex">
						<span class="material-symbols-outlined">delete</span>
						<span class="ml-2">{{ $t('buttons.delete') }}</span>
					</button>
					<button
						@click="menu = false"
						class="px-2 py-2 capitalize hover:bg-background-lighter flex border-t border-background-lighter rounded-b-md"
					>
						<span class="material-symbols-outlined">arrow_back</span>
						<span class="ml-2">{{ $t('buttons.cancel') }}</span>
					</button>
				</section>
				<!-- Delete confirmation -->
				<section
					v-if="menu && deleting"
					class="ml-2 rounded-md bg-background-default flex flex-col h-fit w-80 absolute z-10 border border-background-lighter"
				>
					<div class="px-2 py-2 border-b border-background-lighter">
						<p>{{ $t('comments.deleteConfirmation') }}</p>
					</div>
					<button @click="deleteComment" class="px-2 py-2 capitalize hover:bg-background-lighter flex">
						<span class="material-symbols-outlined text-red-500">delete</span>
						<span class="ml-2 text-red-500">{{ $t('buttons.delete') }}</span>
					</button>
					<button
						@click="deleting = false"
						class="px-2 py-2 capitalize hover:bg-background-lighter flex border-t border-background-lighter rounded-b-md"
					>
						<span class="material-symbols-outlined">arrow_back</span>
						<span class="ml-2">{{ $t('buttons.cancel') }}</span>
					</button>
				</section>
			</div>
			<div class="block">
				<!-- Comment body -->
				<p v-if="!editing" class="ml-[7px]" style="display: inline-block; word-break: break-word">
					{{ comment.content }}
				</p>
				<!-- Edit comment body -->
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
import {useMeStore} from '@/stores/me'

export default {
	name: 'CommentComponent',
	components: {AvatarHelper, EditCommentComponent},

	//Get comment from parent for render
	props: {
		comment: Object,
	},

	//Setup Pinia storage
	setup() {
		const meStore = useMeStore()
		return {meStore}
	},

	//Data stores commentor profile and states of deleting, editing and menu open
	data() {
		return {
			profile: {},
			menu: false,
			deleting: false,
			editing: false,
		}
	},

	//Check ownership
	computed: {
		isOwner() {
			return this.meStore.$state.profileId === this.profile.profileId
		},

		//Simplifies time to a user friendly form
		simpliTime() {
			//Change time to the time from created to current a time above from the base time of 1.1.1970 UTC
			const currentTime = new Date((new Date().getTime() + new Date().getTimezoneOffset()) - (new Date(this.comment.date).getTime() + new Date(this.comment.date).getTimezoneOffset()))
			//Step down until minimum
			if (currentTime.getFullYear() - 1970) {
				return this.$tc('time.year', currentTime.getFullYear() - 1970, {amount: currentTime.getUTCFullYear() - 1970})
			} else if (currentTime.getMonth()) {
				return this.$tc('time.month', currentTime.getMonth(), {amount: currentTime.getUTCMonth()})
				//Adjust from date minimum of 1st
			} else if (currentTime.getDate() - 1) {
				return this.$tc('time.day', currentTime.getDate() - 1, {amount: currentTime.getDate() - 1})
			} else if (currentTime.getHours()) {
				return this.$tc('time.hour', currentTime.getUTCHours(), {amount: currentTime.getHours()})
			} else if (currentTime.getMinutes()) {
				return this.$tc('time.minute', currentTime.getMinutes(), {amount: currentTime.getMinutes()})
			} else if (currentTime.getSeconds()) {
				return this.$tc('time.second', currentTime.getSeconds(), {amount: currentTime.getSeconds()})
			}
		},

	},

	methods: {
		//Get commentor profile from API
		async getProfile() {
			if (this.comment) {
				axios.get('/api/Profile/' + this.comment.profileId).then((response) => {
					this.profile = response.data
				})
			}
		},

		//Delete comment
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

	//When comment component mounts get profiles
	mounted() {
		this.getProfile()
	},

	//Watch for updated profile if comment order is updated
	watch: {
		comment: {
			handler() {
				this.getProfile()
			},
		},
	},
}
</script>
