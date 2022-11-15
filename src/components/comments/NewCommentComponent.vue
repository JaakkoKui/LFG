<template>
	<!-- New comment -->
	<div v-if="me" class="my-5 w-1/2 flex ml-10">
		<div class="w-[35px] h-[35px] mr-2.5">
			<AvatarHelper :avatar="me.avatar" :profile-id="me.profileId" />
		</div>
		<div class="w-full">
			<textarea
				v-model="text"
				@input="textAreaChange"
				class="w-full rounded-md bg-lightBackground text-gray-300 px-2"
				:maxlength="maxLenght"
				:rows="rows"
			></textarea>
			<transition>
				<div v-if="active" class="w-fit ml-auto">
					<CancelButtonHelper @click="handleCancel" />
					<ButtonHelper name="comment" />
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import AvatarHelper from '../../helpers/AvatarHelper.vue'
import ButtonHelper from '@/helpers/ButtonHelper.vue'
import CancelButtonHelper from '@/helpers/CancelButtonHelper.vue'
import axios from 'axios'

export default {
	name: 'NewCommentComponent',
	components: {
		CancelButtonHelper,
		AvatarHelper,
		ButtonHelper,
	},

	data() {
		return {
			rows: 2,
			maxLenght: 250,
			active: false,

			text: '',

			me: null,
		}
	},

	methods: {
		handleCancel() {
			this.text = ''
			this.textAreaChange()
		},

		textAreaChange() {
			this.active = this.text.length > 0
			if (this.active) {
				this.rows = 3
			} else {
				this.rows = 2
			}
		},

		getMe() {
			axios
				.get('https://localhost:5001/api/Profile/@me')
				.then((response) => {
					this.me = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		},
	},

	mounted() {
		this.getMe()
	},
}
</script>

<style>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
