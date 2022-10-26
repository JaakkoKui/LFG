<template>
  <!-- Profile header -->
  <div>
    <ProfileInfoComponent
      :nickname="profile.Nickname"
      :firstname="profile.FirstName"
      :lastname="profile.LastName"
      :age="profile.Age"
      :avatar="profile.Avatar"
      :discordnick="profile.DiscordNick"
      :joindate="profile.JoiningDate"
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
          :key="game.GameId"
          :gameId="game.GameId"
          :gameName="game.GameName"
          :hoursPlayed="game.HoursPlayed"
          :profile-name="profile.Nickname"
      />
      <div class="ring-4 hover:ring-4 hover:ring-primary hover:ring-offset-4 rounded-lg ring-darkBackground flex flex-col h-96 w-60 mx-2 text-white bg-darkBackground">
        <button class="rounded-lg w-full h-full font-bold text-7xl bg-darkBackground text-white hover:bg-primary">+</button>
      </div>
    </div>
  </div>

  <!-- Posts container -->
  <div class="absolute font-bold ml-10 mt-10 border-b-4 border-gray-300 text-3xl w-[calc(100%-100px)]">
    <h1 class="bg-darkBackground pr-5 -mb-4 w-fit">Posts</h1>
  </div>
  <div class="pt-10">
    <PostFlexComponent :profiles="states.profiles" :comments="states.comments" :posts="posts"/>
  </div>
</template>

<script>
import ProfileInfoComponent from "@/components/ProfileInfoComponent";
import GameComponent from "@/components/GameComponent";
import PostFlexComponent from "@/components/PostFlexComponent";

export default {
  name: "ProfileView",
  components: {PostFlexComponent, GameComponent, ProfileInfoComponent},
  
  props: {
    states: [],
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
    }
  },
  
  methods: {
    getGames(){
      this.states.games.forEach( (currentGame) => {
        if(currentGame.ProfileId == this.profile.ProfileId){
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