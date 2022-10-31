<template>
  <div v-if="profile" class="my-5 w-1/2 flex ml-10">
    <div class="w-[35px] h-[35px]">
      <AvatarComponent/>
    </div>
    
    <div>
      <div class="flex">
        <h4 class="font-bold h-fit ml-[7px]">{{profile.Nickname}}</h4>
        <h6 class="italic text-xs font-semobold mt-1 ml-2">({{comment.Date}})</h6>
      </div>
      <div>
        <p class="ml-[7px]">{{ comment.CommentContent }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarComponent from "@/components/subcomponents/AvatarComponent";
export default {
  name: "CommentComponent",
  components: {AvatarComponent},
  props: {
    profiles: Array,
    comment: Object,
  },

  computed: {
    profile(){
      return this.profiles.find(profile => profile.ProfileId == this.comment.CommentingProfile)
    },
  },
}
</script>