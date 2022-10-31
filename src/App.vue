<template>
  <nav class="h-[65px] flex relative font-semibold text-gray-600 bg-white drop-shadow-lg z-20">
    
    <div class="flex h-full mx-auto w-fit justify-around">
      <router-link class="px-5 hover:bg-gray-300 h-full hover:text-gray-900" v-for="navItem in navLinks" :key="navItem.navName" :to="navItem.to"><button class="h-full">{{navItem.navName}}</button></router-link>
    </div>
    
    <div class="absolute right-0 h-[65px] flex">
      <router-link v-if="loggedEmail === null" to="/login"><button class="h-full px-5 hover:bg-gray-300 hover:text-gray-900">Login</button></router-link>
      <router-link v-if="loggedEmail !== null" :to="'/profile/' + currentProfile.Nickname">
        <button class="h-full px-5 hover:bg-gray-300 hover:text-gray-900 flex">
          <AvatarComponent class="h-[40px] my-auto"/>
          <span class="text-regular my-auto ml-2">{{currentProfile.Nickname}}</span>
        </button>
      </router-link>
      <button v-if="loggedEmail !== null" class="px-5 bg-red-600 h-full text-white hover:bg-red-400" @click="logout">Logout</button>
    </div>
  </nav>
  <div class="text-gray-300">
    <router-view @login="handleLogin" :states="states" :email="loggedEmail" @refreshPosts="getPosts"/>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import AvatarComponent from "@/components/subcomponents/AvatarComponent";

export default {
  components: {AvatarComponent},
  data() {
    return {
      navLinks: [ { navName: "Feed", to: "/" }, { navName: "About", to: "/about" } ],
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
    
    logout(){
      this.loggedEmail = null
      router.push('/login')
    },

    handleLogin(response, email){
      console.log('email:' + email)
      console.log(response.IsSuccess)
      if(response.IsSuccess) {
        this.loggedEmail = email
        router.push('/');
      }
    },
    
    getPosts() {
      axios
          .get(this.host + '/Post')
          .then(response => (this.states.posts = response.data))
          .catch()

      console.log('PostsGotten!')
    },
    
    getComments() {
      axios
          .get(this.host + '/Comment')
          .then(response => (this.states.comments = response.data))
          .catch()
    },

    getProfiles() {
      axios
          .get(this.host + '/Profile')
          .then(response => (this.states.profiles = response.data))
          .catch()
    },

    getGames() {
      axios
          .get(this.host + '/Game')
          .then(response => (this.states.games = response.data))
          .catch()
      
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
