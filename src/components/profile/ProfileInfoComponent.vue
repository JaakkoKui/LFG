<template>
<div class="w-full flex p-10">
  <div class="w-[100px] h-[100px] mr-10">
    <AvatarComponent :avatar="profile.avatar" :nickname="profile.nickname"/>
  </div>
  <div class="flex justify-between w-full">
    <div>
      <div class="flex">
        <h1 class="text-3xl font-bold h-fit">{{profile.nickname}}</h1>
        <h4 v-if="profile.firstName || profile.lastName" class="text-md capitalize font-semibold italic ml-2 h-fit my-auto">( {{profile.firstName}} {{profile.lastName}} )</h4>
      </div>
      <p v-if="profile.Age > 0">Age: {{profile.age}}</p>
    </div>
    <div class="font-semibold flex flex-col justify-around">
      <p class="w-fit ml-auto mb-auto">Join date: {{profile.joiningDate}}</p>
      <RouterLink v-if="isProfileOwner" class="uppercase font-semibold w-fit ml-auto text-gray-400" :to="'/profile/edit/' + profile.nickname" >Edit</RouterLink>
      <div v-if="profile.discordNick" class="flex w-fit ml-auto mt-auto">
        <img class="h-[15px] object-contain my-auto mr-1.5" src="@/assets/images/discord-icon.png" alt="discord">
        <p>{{profile.discordNick}}</p>
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
    profile: Object,
    isProfileOwner: Boolean
  },
}
</script>