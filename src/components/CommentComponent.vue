<template>
  <div v-if="profile" class="my-5 w-1/2 flex ml-10">
    <div class="w-[35px] h-[35px]">
      <AvatarHelper/>
    </div>
    
    <div>
      <div class="flex">
        <h4 class="font-bold h-fit ml-[7px]">{{profile.nickname}}</h4>
        <h6 class="italic text-xs font-semobold mt-1 ml-2">({{comment.date}})</h6>
      </div>
      <div>
        <p class="ml-[7px]">{{ comment.commentContent }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarHelper from "@/helpers/AvatarHelper";
export default {
  name: "CommentComponent",
  components: {AvatarHelper},
  
  props: {
    comment: Object,
  },
}
</script>