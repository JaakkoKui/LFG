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
          :profile-name="profile.nickname"
      />
      <div v-if="isTheProfileOwner" class="ring-4 rounded-lg ring-darkBackground flex flex-col h-96 w-60 mx-2 relative text-white bg-darkBackground transition ease-in-out hover:scale-105 duration-200 hover:bg-primary hover:ring-primary">
        <router-link :to="'/profile/' + profile.nickname + '/games/new'" class="rounded-lg w-full h-full font-bold text-7xl bg-darkBackground text-white hover:bg-primary flex justify-center"><span class="my-auto block h-fit">+</span></router-link>
      </div>
    </div>
  </div>

  <!-- Posts container -->
  <div class="absolute flex font-bold ml-10 mt-10 border-b-4 border-gray-300 text-3xl w-[calc(100%-100px)]">
    <h1 class="bg-darkBackground pr-5 -mb-4 w-fit">Posts</h1>
    <div v-if="isTheProfileOwner && !isAddingNewPost" class="text-base -mb-5 ml-auto bg-darkBackground z-10 px-5">
      <ButtonSubComponent class="-mr-10" @buttonClick="isAddingNewPost = true" name="New Post"/>
    </div>
  </div>
  <div class="pt-10">
    <div v-if="isTheProfileOwner && isAddingNewPost" class="px-10 pt-[60px] -mb-10 z-10">

      <div class="flex w-full">

        <!-- Poster Avatar -->
        <div class="mx-5 w-[50px]">
          <AvatarComponent/>
        </div>

        <!-- Post body -->
        <div class="w-[calc(100%-200px)]">
          <!-- Post header -->
          <div class="flex h-[50px]">
            <router-link v-if="profile" class="text-md font-bold hover:text-white" :to="'/profile/' + profile.nickname">{{profile.nickname}} (You)</router-link>
          </div>

          <!-- Post content -->
          <div class="mb-5">
            <h1 class="break-words text-xl font-bold mb-2">
              <input class="-ml-2 rounded-lg bg-lightBackground text-white px-2 w-[400px]" v-model="postInfo.title" placeholder="Title" maxlength="50"/>
            </h1>
            <textarea class="-ml-2 rounded-lg bg-lightBackground text-white px-2 w-full" v-model="postInfo.content" placeholder="Content" maxlength="512" rows="5"/>
          </div>

        </div>
      </div>
      
      <div class="w-fit ml-auto flex mr-[120px]">
        <button @click="cancelNewPost" class="font-semibold py-2 px-5 w-fit uppercase">Cancel</button>
        <ButtonSubComponent class="disabled:bg-lightBackground transition ease-in-out duration-300" :disabled="!postInfo.title || !postInfo.content"  @buttonClick="postNewPost" name="Post"/>
      </div>
    </div>
    <PostFlexComponent :profiles="states.profiles" :comments="states.comments" :posts="posts" :current-user-email="email" :is-owner="isTheProfileOwner" @refreshPosts="refreshPosts"/>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileView",
  components: {},
  
  props: {
    states: Object,
    email: String,
  },
  
  data(){
    return {
      games: [],
      isAddingNewPost: false,
      postInfo: {
        postId: 0,
        title: "",
        createDate: "",
        content: "",
        posterProfile: null,
        photoFileName: "no-file",
        likepost: 0,
        dislikepost: 0
      },
    }
  },
  
  computed: {
    profile(){
      return this.states.profiles.find(profile => profile.nickname === this.$route.params.userNick)
    },
    
    isTheProfileOwner(){
      return this.profile.email === this.email
    },

    posts(){
      let posts = []
      this.states.posts.forEach( (currentPost) => {
        if(currentPost.posterProfile == this.profile.profileId){
          posts.push(currentPost)
        }
      })
      return posts
    }
  },
  
  methods: {
    
    postNewPost(){
      if(this.postInfo.title && this.postInfo.content){
        
        const today = new Date()
        this.postInfo.createDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'T'+String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0')
        this.postInfo.posterProfile = this.profile.profileId
        
        if(this.postInfo.posterProfile){
          axios
              .post("https://localhost:44372/api/Post", this.postInfo)
              .then(response => {this.isAddingNewPost = false; this.refreshPosts()})
              .catch()
        }
        
      }
    },
    
    cancelNewPost(){
      this.isAddingNewPost = false
      this.postInfo.title = ""
      this.postInfo.content = ""
    },
    
    getGames(){
      this.states.games.forEach( (currentGame) => {
        if(currentGame.profileId == this.profile.profileId){
          this.games.push(currentGame)
        }
      })
    },

    refreshPosts(){
      this.$emit("refreshPosts")
    },
      
  },

  mounted () {
    this.getGames()
  },
}
</script>