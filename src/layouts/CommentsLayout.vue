<template>
  <div v-if="commentsOpen">

    <!-- New comment -->
    <div v-if="isOwner" class="my-5 w-1/2 flex ml-10">
      <div class="w-[35px] h-[35px]">
        <AvatarHelper/>
      </div>

      <div class="w-full">
        <div class="flex">
          <h4 class="font-bold h-fit ml-[7px]">{{profile.nickname}}</h4>
        </div>
        <div class="w-full px-2">
          <textarea class="bg-lightBackground rounded-md px-2 py-1 w-full mt-1" id="commentText" :rows="commentRows" @click="openNewComment" maxlength="50" placeholder="Comment" v-model="commentInfo.commentContent"/>
        </div>
        <div v-show="newCommentOpen" class="mt-2 ml-auto w-fit px-2">
          <button class="py-2 px-5 uppercase font-semibold" @click="handleCommentCancel">Cancel</button>
          <ButtonHelper class="disabled:bg-lightBackground transition duration-300 ease-in-out" :disabled="!commentInfo.commentContent" name="Comment" @buttonClick="postComment"/>
        </div>

      </div>
    </div>

    <div v-for="(comment, key) in comments" :key="key">
      <CommentComponent :comment="comment"/>
    </div>

  </div>
</template>

<script>
export default {
  name: "CommentLayout"
}
</script>

<style scoped>

</style>