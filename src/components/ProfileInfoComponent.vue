<template>
<div class="w-full flex p-10">
  <div class="w-[100px] h-[100px] mr-10">
    <AvatarComponent :avatar="avatar" :nickname="nickname"/>
  </div>
  <div class="flex justify-between w-full">
    <div>
      <div class="flex">
        <h1 class="text-3xl font-bold h-fit">{{nickname}}</h1>
        <h4 class="text-md capitalize font-semibold italic ml-2 h-fit my-auto">( {{firstname}} {{lastname}} )</h4>
      </div>
      <p>Age: {{age}}</p>
    </div>
    <div class="font-semibold flex flex-col justify-around">
      <p>Join date: {{joindate}}</p>
      <button class="uppercase font-semibold w-fit ml-auto text-gray-400">Edit</button>
      <div class="flex w-fit ml-auto">
        <img class="h-[15px] object-contain my-auto mr-1.5" src="@/assets/images/discord-icon.png" alt="discord">
        <p>{{discordnick}}</p>
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
    nickname: String,
    firstname: String,
    lastname: String,
    age: Number,
    avatar: String,
    discordnick: String,
    joindate: String,
  }
}
</script>