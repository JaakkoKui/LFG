<template>
	<img
		v-if="profileId"
		alt="avatar"
		class="aspect-square object-contain rounded-full bg-primary"
		:src="'https://cdn.discordapp.com/avatars/' + this.profileId + '/' + this.avatar + '.jpg'"
	/>
	<div v-else class="w-full aspect-square rounded-full bg-gray-700 animate-pulse"></div>
</template>

<script>
export default {
	name: 'AvatarComponent',

	props: {
		avatar: String,
		profileId: String,
	},
}
</script>
