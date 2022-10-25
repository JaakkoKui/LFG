<template>
  <!-- Post flexbox -->
  <div class="w-full flex flex-col gap-y-5 p-5">

    <!-- Post list render -->
    <PostComponent
        v-for="post in posts"
        :key="post.PostId"
        :postID="post.PostId"
        :posterID="post.PosterProfile"
        :posting-date="post.CreateDate"
        :post-title="post.Title"
        :post-content="post.Content"
        :post-likes="post.Likepost"
        :post-dislikes="post.Dislikepost"
    />
  </div>
</template>

<script>
import PostComponent from "@/components/PostComponent.vue";

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