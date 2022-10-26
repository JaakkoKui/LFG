<template>
  <div class="w-screen h-full bg-darkBackground min-h-[calc(100vh-65px)] overflow-clip">
    <div class="basis-2/3 bg-darkBackground relative">
      <div class="absolute h-[700px] w-[700px] rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 rotate-45 -right-[100px] -top-[500px] z-10">
        <div class="absolute h-[670px] w-[670px] bg-darkBackground">
          
        </div>
      </div>
      <div class="absolute h-[1100px] w-[1100px] rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 opacity-50 rotate-45 -right-[300px] -top-[800px]">
        <div class="absolute h-[1070px] w-[1070px] bg-darkBackground">
          
        </div>
      </div>
      <div class="absolute h-[1000px] w-[1100px] rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-50 -rotate-45 -left-[700px] -bottom-[130vh] z-10">
        <div class="absolute h-[970px] w-[1070px] bg-darkBackground">
          
        </div>
      </div>
      <div class="absolute h-[1100px] w-[1100px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50 -rotate-45 -left-[560px] -bottom-[130vh]">
        <div class="absolute h-[1070px] w-[1070px] bg-darkBackground">
          
        </div>
      </div>
    </div>
    <div class="flex md:w-[800px] lg:w-[1000px] 2xl:w-[1100px] mx-auto pt-10 relative z-10 drop-shadow-lg">
      <div class="w-1/2 rounded-l-lg flex justify-center aspect-[1/1.4142]">
        <img class="object-fill w-full rounded-l-lg" src="@/assets/images/DemoCovers/Foxhole.png" alt="game">
      </div><div class="w-1/2 text-gray-300 bg-lightBackground rounded-r-lg">
      <div class="m-10">
        <h1 class="text-4xl font-bold">{{game.GameName}}</h1>
        <ul class="py-5 my-5 border-y border-gray-600">
          <li class="flex">
            <p class="w-[132px] h-[26px] mr-5">Nickname ingame: </p>
            <p class="italic font-semibold">{{game.NicknameIngame}}</p>
          </li>
          <li class="flex">
            <p class="w-[132px] h-[26px] mr-5">Hours played:</p>
            <p class="italic font-semibold">{{game.HoursPlayed}}</p>
          </li>
          <li class="flex">
            <p class="w-[132px] h-[26px] mr-5">Rank:</p> 
            <p class="italic font-semibold">{{game.Rank}}</p>
          </li>
          <li class="flex">
            <p class="w-[132px] h-[26px] mr-5">Server:</p>
            <p class="italic font-semibold">{{game.Server}}</p>
          </li>
        </ul>
        <div>
          <h4 class="font-bold">Comment: <router-link class="text-sm italic font-semibold" :to="'/profile/' + this.$route.params.userNick">(by {{this.$route.params.userNick}})</router-link></h4>
          <p class="mt-1 ml-5">{{game.Comments}}</p>
        </div>
      </div>
      <div class="absolute bottom-5 w-1/2 flex justify-center text-xl text-gray-400">
        <button class="px-5 border-r border-gray-600 hover:text-white">Edit</button>
        <button class="px-5 hover:text-white">Delete</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "GameView",
  
  props: {
    states: []
  },
  
  computed: {
    game(){
      return this.states.games.find(e => e.GameName == this.$route.params.game)
    }
  }
  
}
</script>