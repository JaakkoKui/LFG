<template>
  <div class="flex w-full py-5">
    <!-- Poster Avatar -->
    <div class="mx-5 w-[50px]">
      <AvatarHelper />
    </div>

    <!-- Post body -->
    <div class="w-[calc(100%-200px)]">
      <!-- Post header -->
      <div class="flex h-[50px]">
        <router-link
          v-if="profile"
          class="text-md font-bold hover:text-white"
          :to="'/profile/' + profile.nickname"
          >{{ profile.nickname }}</router-link
        >
        <h4 class="text-sm italic font-semibold text-gray-400 pt-0.5 ml-3">
          {{ post.createDate }}
        </h4>
      </div>

      <!-- Post content -->
      <div class="mb-5">
        <h1 class="break-words text-xl font-bold mb-2">
          <span v-if="!editable">{{ post.title }}</span>
          <input
            v-if="editable"
            class="rounded-md bg-lightBackground px-2 -ml-2 w-1/4"
            :placeholder="post.title"
            v-model="postInfo.title"
          />
        </h1>
        <p>
          <span v-if="!editable">{{ post.content }}</span>
          <textarea
            v-if="editable"
            class="rounded-md bg-lightBackground px-2 -ml-2 w-full"
            rows="3"
            :placeholder="post.content"
            v-model="postInfo.content"
          />
        </p>

        <div v-if="editable" class="w-fit ml-auto mr-2 mt-2">
          <button
            class="px-4 py-2 font-semibold hover:text-white"
            @click="handlePostEditCancel"
          >
            Cancel
          </button>
          <ButtonHelper name="Edit" @buttonClick="editPost" />
        </div>
      </div>

      <!-- Post footter -->

      <button
        v-if="!commentsOpen"
        @click="handleCommentsOpen"
        class="font-semibold text-gray-400 mb-1.5"
      >
        Show {{ post.numberOfCommentsnumberOfComments }} Comments
      </button>

      <button
        v-if="commentsOpen"
        @click="commentsOpen = false"
        class="font-semibold text-gray-400 mb-1.5"
      >
        Hide Comments
      </button>

      <div class="flex mt-auto text-gray-400">
        <p class="border-r pr-2.5 border-gray-400">{{ post.likepost }} likes</p>
        <p class="pl-2.5">{{ post.dislikepost }} dislikes</p>
      </div>
    </div>

    <!-- Post aside -->
    <aside class="flex flex-col justify-between h-16 px-5 pt-2 text-gray-400">
      <!-- Edit and delete buttons (shown within profile view) -->
      <button v-if="isOwner && !editable" class="w-[50px] hover:text-white">
        Edit
      </button>
      <button
        v-if="isOwner && !editable"
        class="w-[50px] text-red-500 hover:text-red-700"
      >
        Delete
      </button>

      <!-- Like buttons (disabled if viewer owns the post or is not logged in) -->
      <button v-if="!isOwner" class="w-[50px] hover:text-white" @click="like">
        <span class="material-symbols-outlined">thumb_up</span>
      </button>
      <button
        v-if="!isOwner"
        class="w-[50px] hover:text-white"
        @click="dislike"
      >
        <span class="material-symbols-outlined">thumb_down</span>
      </button>
    </aside>
  </div>
</template>

<script>
import axios from 'axios'

import AvatarHelper from '@/helpers/AvatarHelper.vue'
import ButtonHelper from '@/helpers/ButtonHelper.vue'

export default {
  name: 'PostComponent',
  components: { ButtonHelper, AvatarHelper },

  props: {
    post: Object
  },

  data() {
    return {
      isOwner: false,
      editable: false,
      commentsOpen: false,

      profile: {},
      comments: []
    }
  },

  mounted() {
    axios
      .get('https://localhost:5001/api/Profile/' + this.post.profileId)
      .then((response) => {
        this.profile = response.data
      })
  }
}
</script>
