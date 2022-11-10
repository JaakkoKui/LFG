<template>
  <nav class="h-[65px] flex relative font-semibold text-gray-600 bg-white drop-shadow-lg z-20">
    
    <div class="flex h-full mx-auto w-fit justify-around">
      <router-link class="px-5 hover:bg-gray-300 h-full hover:text-gray-900" v-for="navItem in navLinks" :key="navItem.navName" :to="navItem.to"><button class="h-full">{{navItem.navName}}</button></router-link>
    </div>
    
    <div class="absolute right-0 h-[65px] flex">

      <a href="https://localhost:5001/Auth/Login">
        <button class="h-full px-5 hover:bg-gray-300 hover:text-gray-900">Login</button>
      </a>
      
      <router-link to="/profile">
        <button class="h-full px-5 hover:bg-gray-300 hover:text-gray-900 flex">
          <AvatarHelper class="h-[40px] my-auto"/>
          <span class="text-regular my-auto ml-2">Profiili</span>
        </button>
      </router-link>
      
      <a>
        <button @click="logout" class="px-5 bg-red-600 h-full text-white hover:bg-red-400">Logout</button>
      </a>
    </div>
    
  </nav>
  
  <div class="text-gray-300">
    <router-view/>
  </div>
  
</template>

<script>

import axios from "axios";
import AvatarHelper from "@/helpers/AvatarHelper";

export default {
  
  components: {AvatarHelper},
  
  data() {
    return {
      
      navLinks: [ 
        { navName: "Feed", to: "/" }, 
        { navName: "About", to: "/about" } 
      ],
      
      api : 'https://localhost:5001/',
      
    }
  },
  
}

</script>

<style scoped>
@import './assets/output.css';
</style>
