<template>
	<div class="w-full">
		<div class="flex">
			<h4 class="font-bold h-fit ml-[7px]">{{ profile.nickname }}</h4>
		</div>
		<div class="w-full px-2">
			<textarea
				id="commentText"
				v-model="commentInfo.commentContent"
				:rows="commentRows"
				class="bg-lightBackground rounded-md px-2 py-1 w-full mt-1"
				maxlength="50"
				placeholder="Comment"
				@click="openNewComment"
			/>
		</div>
		<div v-show="newCommentOpen" class="mt-2 ml-auto w-fit px-2">
			<button class="py-2 px-5 uppercase font-semibold" @click="handleCommentCancel">Cancel</button>
			<ButtonHelper
				:disabled="!commentInfo.commentContent"
				class="disabled:bg-lightBackground transition duration-300 ease-in-out"
				name="Comment"
				@buttonClick="postComment"
			/>
		</div>
	</div>
</template>

<script>
import ButtonHelper from '../../helpers/ButtonHelper.vue'

export default {
	name: 'NewCommentComponent',

	components: {
		ButtonHelper,
	},
}
</script>

<style scoped></style>
