<template>
  <nav class="h-[65px] flex relative font-semibold text-gray-600 bg-white drop-shadow-lg z-20">
    <div class="flex h-full mx-auto w-fit justify-around">
      <router-link class="px-5 hover:bg-gray-300 h-full hover:text-gray-900" v-for="navItem in navLinks" :key="navItem.navName" :to="navItem.to"><button class="h-full">{{navItem.navName}}</button></router-link>
    </div>
    
    <div class="absolute right-0 h-[65px]">
      <router-link v-if="loggedEmail === null" to="/login"><button class="h-full px-5 hover:bg-gray-300 hover:text-gray-900">Login</button></router-link>
      <router-link v-if="loggedEmail !== null" :to="'/profile/' + currentProfile.Nickname"><button class="h-full px-5 hover:bg-gray-300 hover:text-gray-900">Profile</button></router-link>
      <button v-if="loggedEmail !== null" class="px-5 bg-red-600 h-full text-white hover:bg-red-400" @click="loggedEmail = null">Logout</button>
    </div>
  </nav>
  <div class="text-gray-300">
    <router-view @login="handleLogin" :states="states" :email="loggedEmail"/>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

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
      },

      loggedEmail: String,
      
    }
  },
  
  methods: {

    handleLogin(response, email){
      console.log('email:' + email)
      console.log(response.IsSuccess)
      if(response.IsSuccess) {
        this.loggedEmail = email
      }
      router.push('/');
    },
    
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
    
    compare(a){
      console.log(a.Email === this.loggedEmail)
      return a.Email === this.loggedEmail
    }
  },
  
  computed: {
    currentProfile() {
      if(this.states.profiles.length > 0){
        console.log('current profiles: ' + this.states.profiles.length)
        console.log(this.loggedEmail)
        return this.states.profiles.find(this.compare)
      } else {
        return 'Xermos'
      }
    }
  },
  
  mounted() {
    
    if(localStorage.loggedEmail !== 'null'){
      this.loggedEmail = localStorage.loggedEmail
    } else {
      this.loggedEmail = null
    }
    
    this.getPosts()
    this.getGames()
    this.getComments()
    this.getProfiles()
    
  },
  watch: {
    loggedEmail(newEmail) {
      console.log('watch: ' + newEmail)
      localStorage.loggedEmail = newEmail
    }
  }
}
</script>

<style scoped>
@import './assets/output.css';
</style>