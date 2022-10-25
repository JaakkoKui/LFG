<template>
  <PostFlexComponent :posts="posts"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from "axios";
import PostFlexComponent from "@/components/PostFlexComponent.vue";

export default defineComponent({
  name: 'HomeView',
  components: {
    PostFlexComponent
  },
  
  data(){
    return {
      posts: [],
    }
  },

  mounted () {
    axios
        .get('https://localhost:44372/api/Post')
        .then(response => (this.posts = response.data))
        .catch()
  }
});
</script>
