<template>
  <!-- Post flexbox -->
  <div class="w-full flex flex-col gap-y-5 p-10">
    <!-- Post list render -->
    <div v-for="post in posts" :key="post.postId">
      <PostComponent
          @refreshPosts="$emit('refreshPosts')"
          :post="post"
          :profile="profile(post.posterProfile)"
          :is-owner="isOwner"
      />
      <hr class="w-full border-gray-700">
    </div>
  </div>
</template>

<script>
import PostComponent from "@/components/subcomponents/PostComponent.vue";

export default({
  name: "PostsLayout",

  components: {
    PostComponent,
  },
  
  props: {
    profiles: Array,
    comments: Array,
    posts: Array,
    isOwner: Boolean,
    currentUserEmail: String,
  },
  
  methods: {
    //javascript poc, edit later pls
    profile(id){
      return this.profiles.find(element => String(element.profileId) === id)
    },
  },
})
</script>