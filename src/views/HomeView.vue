<template>
  <div class="absolute font-bold ml-10 mb-10 border-b-4 border-gray-300 text-3xl w-[calc(100%-100px)]">
    <h1 class="bg-darkBackground pr-5 -mb-4 w-fit">Posts</h1>
  </div>
  <PostFlexComponent class="mt-10 pt-10" :posts="posts"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostFlexComponent from "@/components/PostFlexComponent.vue"
import { rootStates } from "@/state-management";

export default defineComponent({
  name: 'HomeView',
  components: {
    PostFlexComponent
  },
  
  data(){
    return {
      rootStates,
      posts: [],
    }
  },
  
  methods: {
    getPosts(){
      this.posts = rootStates.posts;
    }
  },
  
  mounted(){
    this.getPosts();
  }
});
</script>
