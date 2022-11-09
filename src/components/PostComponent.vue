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
        <router-link v-if="profile" class="text-md font-bold hover:text-white" :to="'/profile/' + profile.nickname">{{profile.nickname}}</router-link>
        <h4 class="text-sm italic font-semibold text-gray-400 pt-0.5 ml-3">{{post.createDate}}</h4>
      </div>

      <!-- Post content -->
      <div class="mb-5">
        <h1 class="break-words text-xl font-bold mb-2">
          <span v-if="!editable">{{postTitle}}</span>
          <input v-if="editable" class="rounded-md bg-lightBackground px-2 -ml-2 w-1/4" :placeholder="post.title" v-model="postInfo.title">
        </h1>
        <p>
          <span v-if="!editable">{{postContent}}</span>
          <textarea v-if="editable" class="rounded-md bg-lightBackground px-2 -ml-2 w-full" rows="3" :placeholder="post.content" v-model="postInfo.content"/>
        </p>
        
        <div v-if="editable" class="w-fit ml-auto mr-2 mt-2">
          <button class="px-4 py-2 font-semibold hover:text-white" @click="handlePostEditCancel">Cancel</button>
          <ButtonSubComponent name="Edit" @buttonClick="editPost"/>
        </div>
      </div>

      <!-- Post footter -->
      
      <button v-if="!commentsOpen" @click="handleCommentsOpen" class="font-semibold text-gray-400 mb-1.5">Show {{post.numberOfCommentsnumberOfComments}} Comments</button>
      
      <button v-if="commentsOpen" @click="commentsOpen = false" class="font-semibold text-gray-400 mb-1.5">Hide Comments</button>
      
      <div v-if="commentsOpen">
        
        <!-- New comment -->
        <div v-if="isOwner" class="my-5 w-1/2 flex ml-10">
          <div class="w-[35px] h-[35px]">
            <AvatarComponent/>
          </div>

          <div class="w-full">
            <div class="flex">
              <h4 class="font-bold h-fit ml-[7px]">{{profile.nickname}}</h4>
            </div>
            <div class="w-full px-2">
              <textarea class="bg-lightBackground rounded-md px-2 py-1 w-full mt-1" id="commentText" :rows="commentRows" @click="openNewComment" maxlength="50" placeholder="Comment" v-model="commentInfo.commentContent"/>
            </div>
            <div v-show="newCommentOpen" class="mt-2 ml-auto w-fit px-2">
              <button class="py-2 px-5 uppercase font-semibold" @click="handleCommentCancel">Cancel</button>
              <ButtonSubComponent class="disabled:bg-lightBackground transition duration-300 ease-in-out" :disabled="!commentInfo.commentContent" name="Comment" @buttonClick="postComment"/>
            </div>
            
          </div>
        </div>
        
        <div v-for="(comment, key) in comments" :key="key">
          <CommentComponent :comment="comment"/>
        </div>
        
      </div>
      
      <div class="flex mt-auto text-gray-400">
        <p class="border-r pr-2.5 border-gray-400">{{post.likepost}} likes</p>
        <p class="pl-2.5">{{post.dislikepost}} dislikes</p>
      </div>

    </div>

    <!-- Post aside -->
    <div class="flex flex-col justify-between h-16 px-5 pt-2 text-gray-400">

      <!-- Edit and delete buttons (shown within profile view) -->
      <button v-if="isOwner && !editable" @click="handlePostEditable" class="w-[50px] hover:text-white">Edit</button>
      <button v-if="isOwner && !editable" @click="deletePost" class="w-[50px] text-red-500 hover:text-red-700">Delete</button>
      
      <!-- Like buttons (disabled if viewer owns the post or is not logged in) -->
      <button v-if="!isOwner" class="w-[50px] hover:text-white" @click="like"><span class="material-symbols-outlined">thumb_up</span></button>
      <button v-if="!isOwner" class="w-[50px] hover:text-white" @click="dislike"><span class="material-symbols-outlined">thumb_down</span></button>
      
    </div>
  </div>
</template>

<script>
import AvatarComponent from "@/components/subcomponents/AvatarComponent";
import CommentComponent from "@/components/subcomponents/CommentComponent";
import axios from "axios";
import ButtonSubComponent from "@/components/subcomponents/ButtonSubComponent";

export default {
  name: "PostComponent",
  components: {ButtonSubComponent, CommentComponent, AvatarComponent},
  
  props: {
    post: Object,
    profile: Object,
    isOwner: Boolean
  },
  
  data(){
    return{
      editable: false, //Change in order to edit this post
      
      commentRows: 1, //Amount of rows in the comment textarea
      
      newCommentOpen: false,
      commentsOpen: false, //Are the post comments open?
      
      comments: [],
      
      commentInfo: {
        id: 0,
        commentContent: "",
        date: "",
        commentingProfile: 0,
        postId: 0
      },
      
      postInfo: {
        postId: 0,
        title: "",
        createDate: "",
        content: "",
        posterProfile: 0,
        photoFileName: "",
        likepost: 0,
        dislikepost: 0
      }
    }
  },
  
  methods: {

    handleCommentsOpen(){
      axios
          .get("https://localhost:44372/api/Comment/" + this.post.postId)
          .then(response => {
            this.comments = response.data
            this.commentsOpen = true
          })
          .catch()
    },
    
    handlePostEditable(){
      this.postInfo.title = this.post.title
      this.postInfo.content = this.post.content
      
      this.editable = true
    },

    handlePostEditCancel(){
      this.editable = false
      this.postInfo.title = this.post.title
      this.postInfo.content = this.post.content
    },

    editPost(){

      this.postInfo.postId = this.postId
      this.postInfo.createDate = this.post.createDate
      this.postInfo.posterProfile = this.profile.profileId
      this.postInfo.likepost = this.post.likepost
      this.postInfo.dislikepost = this.post.dislikepost
      
      axios
          .put("https://localhost:44372/api/Post", this.postInfo)
          .then(() => {this.editable = false; this.$emit('refreshPosts')})
          .catch()
    },

    deletePost(){
      axios
          .delete("https://localhost:44372/api/Post/" + this.postId)
          .then()
          .catch()
    },

    openNewComment(){
      this.commentRows = 4
      this.newCommentOpen = true
    },
    
    handleCommentCancel(){
      this.commentRows = 1
      this.newCommentOpen = false
      this.commentInfo.commentContent = ''
    },
    
    postComment(){
      this.commentInfo.postId = this.postId
      this.commentInfo.commentingProfile = this.searchedProfile.profileId

      const today = new Date()
      this.commentInfo.date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'T'+String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0')

      if(this.commentInfo.commentContent){
        axios
            .post("https://localhost:44372/api/Comment", this.commentInfo)
            .then(() => {this.handleCommentCancel(); this.$emit('refreshPosts')})
            .catch()
      }
    }
  },
}
</script>