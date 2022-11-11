<template>
  <div class="absolute font-bold ml-10 mb-10 border-b-4 border-gray-300 text-3xl w-[calc(100%-100px)]">
    <h1 class="bg-darkBackground pr-5 -mb-4 w-fit">Posts</h1>
    <PostsLayout :posts="getPosts"/>
  </div>
</template>

<script>

import axios from "axios";
import PostsLayout from "@/layouts/PostsLayout";

export default{
  name: 'HomeView',
  components: {PostsLayout},
  
  data(){
    return {
      posts: [],
    }
  },
  
  methods: {
    getPosts(){
      axios
          .get('https://localhost:5001/api/Post')
          .then(response => {
            return response.data;
          })
          .catch(error => {
            console.log(error);
          })
    }
  }
}
</script>
