<template>
  <div class="ring-4 rounded-lg ring-darkBackground flex flex-col h-96 w-60 mx-2 relative text-white bg-darkBackground transition ease-in-out hover:scale-105 duration-200 hover:bg-primary">
    <router-link :to="'/profile/' + profileName + '/games/' + gameName">
      <img class="object-contain rounded-t-lg" src="@/assets/images/DemoCovers/Foxhole.png" :alt="gameName">
      <div class="pb-2 h-[140px] w-full absolute bottom-0 bg-gradient-to-t from-darkBackground via-darkBackground rounded-b-lg">
        <div class="mt-auto absolute bottom-0 w-[90%] mx-[5%] mb-2"><h1 class="text-xl font-semibold border-b pb-1 text-center">{{gameName}}</h1>
          <h2 class="text-lg italic font-semibold text-center">{{ hoursPlayed }} Hours</h2>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GameComponent",
  
  props: {
    gameId: Number,
    gameName: String,
    hoursPlayed: Number,
    profileName: String,
  }
}
</script>