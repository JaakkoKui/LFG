<template>
  <div class="absolute font-bold ml-10 mb-10 border-b-4 border-gray-300 text-3xl w-[calc(100%-100px)]">
    <h1 class="bg-darkBackground pr-5 -mb-4 w-fit">Posts</h1>
  </div>
  <PostFlexComponent v-if="states.posts.length > 0" class="mt-10 pt-10" :profiles="states.profiles" :comments="states.comments" :posts="states.posts" :current-user-email="email"/>
</template>

<script>
import PostFlexComponent from "@/components/PostFlexComponent.vue"

export default{
  name: 'HomeView',
  components: {
    PostFlexComponent
  },
  
  props: {
    states: [],
    email: String,
  },

  mounted() {
    console.log(this.states)
  }
}
</script>
