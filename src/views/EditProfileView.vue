<template>
	<article class="m-8 w-full max-w-[1600px]">
		<section class="bg-background-darker rounded-xl p-8">
			<p>Nickname</p>
			<p>Firstname</p>
			<p>Lastname</p>
			<p>Age</p>
		</section>
	</article>
</template>

<script>
import AvatarHelper from '../helpers/AvatarHelper.vue'

export default {
	name: 'ProfileInfoComponent',
	components: { AvatarHelper },

	props: {
		profile: Object,
	},

	data() {
		return {
			profileDto: {
				nickname: '',
				firstName: '',
				lastName: '',
				age: 0,
			},
		}
	},

	computed: {
		simplifiedDate() {
			try {
				const jDate = this.profile.joiningDate.split('T')
				const seperatedDates = jDate[0].split('-')
				return seperatedDates[2] + '.' + seperatedDates[1] + '.' + seperatedDates[0]
			} catch (e) {
				console.log(e)
				return null
			}
		},
	},
}
</script>
