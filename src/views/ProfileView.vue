<template>
  <!-- Profile header -->
  <div>
    <ProfileInfoComponent
      :profile="profile"
      :isProfileOwner="isTheProfileOwner"
    />
  </div>

  <!-- Games container -->
  <div class="px-10 pb-10 pt-8 bg-white text-gray-600 overflow-x-auto">
    <div class="absolute font-bold mb-10 border-b-4 border-gray-300 text-3xl w-[calc(100%-80px)]">
      <h1 class="bg-white pr-5 -mb-4 w-fit">Games</h1>
    </div>
    <div class="flex w-fit mt-[60px]">
      <GameComponent
          v-for="game in games"
          :key="game.gameId"
          
          :gameId="game.gameId"
          :gameName="game.gameName"
          :hoursPlayed="game.hoursPlayed"
          :profile-name="profile.Nickname"
      />
      <div v-if="isTheProfileOwner" class="ring-4 rounded-lg ring-darkBackground flex flex-col h-96 w-60 mx-2 relative text-white bg-darkBackground transition ease-in-out hover:scale-105 duration-200 hover:bg-primary hover:ring-primary">
        <button class="rounded-lg w-full h-full font-bold text-7xl bg-darkBackground text-white hover:bg-primary">+</button>
      </div>
    </div>
  </div>

  <!-- Posts container -->
  <div class="absolute flex font-bold ml-10 mt-10 border-b-4 border-gray-300 text-3xl w-[calc(100%-100px)]">
    <h1 class="bg-darkBackground pr-5 -mb-4 w-fit">Posts</h1>
    <ButtonSubComponent class="text-base -mb-5 ml-auto -mr-5" v-if="isTheProfileOwner" name="New Post"/>
  </div>
  <div class="pt-10">
    <PostFlexComponent :profiles="states.profiles" :comments="states.comments" :posts="posts"/>
  </div>
</template>

<script>
import ProfileInfoComponent from "@/components/ProfileInfoComponent";
import GameComponent from "@/components/GameComponent";
import PostFlexComponent from "@/components/PostFlexComponent";
import ButtonSubComponent from "@/components/subcomponents/ButtonSubComponent";

export default {
  name: "ProfileView",
  components: {ButtonSubComponent, PostFlexComponent, GameComponent, ProfileInfoComponent},
  
  props: {
    states: [],
    email: String,
  },
  
  data(){
    return {
      posts: [],
      games: [],
    }
  },
  
  computed: {
    profile(){
      return this.states.profiles.find(profile => profile.Nickname === this.$route.params.userNick)
    },
    
    isTheProfileOwner(){
      return this.profile.Email === this.email
    }
  },
  
  methods: {
    getGames(){
      this.states.games.forEach( (currentGame) => {
        if(currentGame.profileId == this.profile.ProfileId){
          this.games.push(currentGame)
        }
      })
    },
    getPosts(){
      this.states.posts.forEach( (currentPost) => {
        if(currentPost.PosterProfile == this.profile.ProfileId){
          this.posts.push(currentPost)
        }
      })
    }
      
  },

  mounted () {
    this.getGames()
    this.getPosts()
  }
}
</script>