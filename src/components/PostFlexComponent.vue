<template>
  <!-- Post flexbox -->
  <div class="w-full flex flex-col gap-y-5 p-10">

    <!-- Post list render -->
    <div v-for="post in posts" :key="post.PostId">
      <PostComponent
          :postID="post.PostId"
          :posterID="post.PosterProfile"
          :posting-date="post.CreateDate"
          :post-title="post.Title"
          :post-content="post.Content"
          :post-likes="post.Likepost"
          :post-dislikes="post.Dislikepost"
          :post-comments="post.Comments"
      />
      <hr class="w-full border-gray-700">
    </div>
  </div>
</template>

<script>
import PostComponent from "@/components/subcomponents/PostComponent.vue";

export default {
  name: "PostFlexComponent",

  components: {
    PostComponent
  },

  props: {
    posts: [],
  }
}
</script>