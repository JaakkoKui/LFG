<template>
	<img
		alt="avatar"
		class="aspect-square object-contain rounded-full bg-primary"
		:src="'https://cdn.discordapp.com/avatars/' + profileId + '/' + avatar + '.jpg'"
	/>
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

<style scoped></style>
