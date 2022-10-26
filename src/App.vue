<template>
  <nav class="h-[65px] flex relative font-semibold text-gray-600 bg-white">
    <div class="flex h-full mx-auto w-fit justify-around">
      <router-link class="px-5 hover:bg-gray-300 h-full hover:text-gray-900" v-for="navItem in navLinks" :key="navItem.navName" :to="navItem.to"><button class="h-full">{{navItem.navName}}</button></router-link>
    </div>
    
    <router-link class="px-5 hover:bg-gray-300 h-full hover:text-gray-900" to="/profile/Xermos"><button class="h-full">Profile</button></router-link>
  </nav>
  <div class="text-gray-300">
    <router-view v-if="states.profiles.length > 0" :states="states"/>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      navLinks: [ { navName: "Feed", to: "/" }, { navName: "About", to: "about" } ],
      host : 'https://localhost:44372/api',

      states : {
        posts: [],
        comments: [],
        profiles: [],
        games: [],
      }
    }
  },
  
  methods: {
    getPosts() {
      let returnData = []
      axios
          .get(this.host + '/Post')
          .then(response => (this.states.posts = response.data))
          .catch()

      return returnData
    },
    
    getComments() {
      let returnData = []
      axios
          .get(this.host + '/Comment')
          .then(response => (this.states.comments = response.data))
          .catch()
      
      return returnData
    },

    getProfiles() {
      let returnData = []
      axios
          .get(this.host + '/Profile')
          .then(response => (this.states.profiles = response.data))
          .catch()
      
      return returnData
    },

    getGames() {
      let returnData = []
      axios
          .get(this.host + '/Game')
          .then(response => (this.states.games = response.data))
          .catch()
      
      return returnData
    },
  },
  
  mounted() {
    this.getPosts()
    this.getGames()
    this.getComments()
    this.getProfiles()
  }
}
</script>

<style scoped>
@import './assets/output.css';
</style>
