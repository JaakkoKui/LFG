<template>
  <!-- Post flexbox -->
  <div class="w-full flex flex-col gap-y-5 p-10">
    <!-- Post list render -->
    <div v-for="post in posts" :key="post.PostId">
      <PostComponent
          :posterID="post.PosterProfile"
          :posting-date="post.CreateDate"
          :post-title="post.Title"
          :post-content="post.Content"
          :post-likes="post.Likepost"
          :post-dislikes="post.Dislikepost"
          :post-comments="computedComments(post.PostId)"
          :post-id="post.PostId"
          :profile="profile(post.PosterProfile)"
          :all-profiles="profiles"
          :current-user-email="currentUserEmail"
      />
      <hr class="w-full border-gray-700">
    </div>
  </div>
</template>

<script>
import PostComponent from "@/components/subcomponents/PostComponent.vue";

export default({
  name: "PostFlexComponent",

  components: {
    PostComponent,
  },
  
  props: {
    profiles: [],
    comments: [],
    posts: [],
    currentUserEmail: String,
  },
  
  methods: {
    //javascript poc, edit later pls
    profile(id){
      let profile = this.profiles.find(element => String(element.ProfileId) === id)
      console.log(this.profiles)
      console.log(profile)
      return profile
    },
    
    computedComments(id) {
      let returnArray = []
      this.comments.forEach((e) => {
        if(e.PostId == id){
          returnArray.push(e)
        }
      })
      return returnArray
    },
  },
})
</script>