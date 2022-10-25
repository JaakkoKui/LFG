<template>
  <nav class="h-[65px] flex relative font-semibold text-gray-600 bg-white">
    <div class="flex h-full mx-auto w-fit justify-around">
      <router-link class="px-5 hover:bg-gray-300 h-full hover:text-gray-900" v-for="navItem in navLinks" :key="navItem.navName" :to="navItem.to"><button class="h-full">{{navItem.navName}}</button></router-link>
    </div>
    
    <router-link class="px-5 hover:bg-gray-300 h-full hover:text-gray-900" to="/profile/Xermos"><button class="h-full">Profile</button></router-link>
  </nav>
  <div class="text-gray-300">
    <router-view/>
  </div>
</template>

<script>
import { rootStates } from "@/state-management";

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
</script>
