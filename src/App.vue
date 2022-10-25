<template>
  <nav class="h-[65px] flex relative font-semibold text-gray-600 bg-white">
    <div class="flex h-full mx-auto w-fit justify-around">
      <router-link class="px-5 hover:bg-gray-300 h-full hover:text-gray-900" v-for="navItem in navLinks" :key="navItem.navName" :to="navItem.to"><button class="h-full">{{navItem.navName}}</button></router-link>
    </div>
    
    <router-link class="px-5 hover:bg-gray-300 h-full hover:text-gray-900" to="/profile"><button class="h-full">Profile</button></router-link>
  </nav>
  <div class="text-gray-300">
    <router-view/>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";

export default {
  data() {
    return {
      navLinks: [ { navName: "Feed", to: "/" }, { navName: "About", to: "about" } ],
    }
  },

  mounted () {
    rootStates.getPosts()
    rootStates.getGames()
    rootStates.getProfiles()
  }
}

export const rootStates = reactive({
  
  posts: [],
  profiles: [],
  games: [],
  
  host : 'https://localhost:44372/api',
  
  getPosts() {
  axios
      .get(this.host + '/Post')
      .then(response => (this.posts = response.data))
      .catch()
  },
  
  getProfiles() {
    axios
        .get(this.host + '/Profile')
        .then(response => (this.profiles = response.data))
        .catch()
  },

  getGames() {
    axios
        .get(this.host + '/Game')
        .then(response => (this.games = response.data))
        .catch()
  },
})
</script>
