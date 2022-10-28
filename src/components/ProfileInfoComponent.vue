<template>
<div class="w-full flex p-10">
  <div class="w-[100px] h-[100px] mr-10">
    <AvatarComponent :avatar="profile.Avatar" :nickname="profile.Nickname"/>
  </div>
  <div class="flex justify-between w-full">
    <div>
      <div class="flex">
        <h1 class="text-3xl font-bold h-fit">{{profile.Nickname}}</h1>
        <h4 class="text-md capitalize font-semibold italic ml-2 h-fit my-auto">( {{profile.FirstName}} {{profile.LastName}} )</h4>
      </div>
      <p>Age: {{profile.Age}}</p>
    </div>
    <div class="font-semibold flex flex-col justify-around">
      <p class="w-fit ml-auto mb-auto">Join date: {{profile.JoiningDate}}</p>
      <button v-if="isProfileOwner" class="uppercase font-semibold w-fit ml-auto text-gray-400">Edit</button>
      <div class="flex w-fit ml-auto mt-auto">
        <img class="h-[15px] object-contain my-auto mr-1.5" src="@/assets/images/discord-icon.png" alt="discord">
        <p>{{profile.DiscordNick}}</p>
      </div>
    </div>
    
  </div>
</div>
</template>

<script>
import AvatarComponent from "@/components/subcomponents/AvatarComponent.vue";
export default {
  name: "ProfileInfoComponent",
  components: {AvatarComponent},
  props: {
    profile: {},
    isProfileOwner: Boolean
  },
}
</script>