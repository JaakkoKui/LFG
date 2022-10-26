<template>
  <div class="flex w-full py-5">

    <!-- Poster Avatar -->
    <div class="mx-5 w-[50px]">
      <AvatarComponent/>
    </div>

    <!-- Post body -->
    <div class="w-[calc(100%-200px)]">
      <!-- Post header -->
      <div class="flex h-[50px]">
        <router-link v-if="profile" class="text-md font-bold hover:text-white" :to="'/profile/' + profile.Nickname">{{profile.Nickname}}</router-link>
        <h4 class="text-sm italic font-semibold text-gray-400 pt-0.5 ml-3">{{postingDate}}</h4>
      </div>

      <!-- Post content -->
      <div class="mb-5">
        <h1 class="break-words text-xl font-bold mb-2">{{postTitle}}</h1>
        <p>{{postContent}}</p>
      </div>

      <!-- Post footter -->
      <button v-if="!commentsOpen" @click="commentsOpen = true" class="font-semibold text-gray-400 mb-1.5">Show {{postComments.length}} Comments</button>
      <button v-if="commentsOpen" @click="commentsOpen = false" class="font-semibold text-gray-400 mb-1.5">Hide Comments</button>
      <div v-if="commentsOpen">
        <div v-for="(comment, key) in postComments" :key="key">
          <CommentComponent :profile="profile" :comment="comment"/>
        </div>
      </div>
      <div class="flex mt-auto text-gray-400">
        <p class="border-r pr-2.5 border-gray-400">{{postLikes}} likes</p>
        <p class="pl-2.5">{{postDislikes}} dislikes</p>
      </div>

    </div>

    <!-- Post aside -->
    <div class="flex flex-col justify-between h-16 px-5 pt-2 text-gray-400">
      <button class="w-[50px] hover:text-white" @click="like"><span class="material-symbols-outlined">thumb_up</span></button>
      <button class="w-[50px] hover:text-white" @click="dislike"><span class="material-symbols-outlined">thumb_down</span></button>
    </div>
  </div>
</template>

<script>
import AvatarComponent from "@/components/subcomponents/AvatarComponent";
import CommentComponent from "@/components/subcomponents/CommentComponent";

export default {
  name: "PostComponent",
  components: {CommentComponent, AvatarComponent},
  
  props: {
    postingDate: String,
    
    postTitle: String,
    postContent: String,
    
    postLikes: Number,
    postDislikes: Number,

    profile: [],
    postComments: [],
  },
  
  data(){
    return{
      commentsOpen: false,
    }
  },
}
</script>