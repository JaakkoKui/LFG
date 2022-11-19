<template>
	<article v-if="profile" class="flex">
		<div class="min-w-[35px] w-[35px] h-[35px]">
			<AvatarHelper :avatar="profile.avatar" :profile-id="profile.profileId" />
		</div>

		<div>
			<div class="flex">
				<router-link
					:to="'/profile/' + profile.profileId"
					class="hover:bg-background-default rounded-full font-semibold h-fit px-2"
					>{{ profile.nickname }}</router-link
				>
				<h6 class="italic text-xs mt-1 opacity-70">{{ comment.date }}</h6>
			</div>
			<div>
				<p class="ml-[7px]">{{ comment.content }}</p>
			</div>
		</div>
	</article>
</template>

<script>
import AvatarHelper from '@/helpers/AvatarHelper.vue'
import axios from 'axios'

export default {
	name: 'CommentComponent',
	components: { AvatarHelper },

	props: {
		comment: Object,
		profileId: String,
	},

	data() {
		return {
			profile: {},
		}
	},

	methods: {
		getProfile(id) {
			if (id) {
				axios.get('https://localhost:5001/api/Profile/' + id).then((response) => {
					this.profile = response.data
				})
			}
		},
	},

	mounted() {
		this.getProfile(this.profileId)
	},
}
</script>
