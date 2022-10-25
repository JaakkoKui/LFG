<template>
  <!-- Profile header -->
  <div>
    <ProfileInfoComponent
      :nickname="profile.Nickname"
      :firstname="profile.FirstName"
      :lastname="profile.LastName"
      :age="profile.Age"
      :avatar="profile.Avatar"
      :discordnick="profile.DiscordNick"
      :joindate="profile.JoiningDate"
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
          :key="game.GameId"
          :gameId="game.GameId"
          :gameName="game.GameName"
          :hoursPlayed="game.HoursPlayed"/>
      <div class="ring-4 hover:ring-4 hover:ring-primary hover:ring-offset-4 rounded-lg ring-darkBackground flex flex-col h-96 w-60 mx-2 text-white bg-darkBackground">
        <button class="rounded-lg w-full h-full font-bold text-7xl bg-darkBackground text-white hover:bg-primary">+</button>
      </div>
    </div>
  </div>

  <!-- Posts container -->
  <div>
    <PostFlexComponent :posts="posts"/>
  </div>
</template>

<script>
import ProfileInfoComponent from "@/components/ProfileInfoComponent";
import GameComponent from "@/components/GameComponent";
import PostFlexComponent from "@/components/PostFlexComponent";
import axios from "axios";
export default {
  name: "ProfileView",
  components: {PostFlexComponent, GameComponent, ProfileInfoComponent},
  data(){
    return {
      profile: {
        "ProfileId": 1,
        "Nickname": "Xermos",
        "FirstName": "Jesper",
        "LastName": "Oja",
        "Age": 33,
        "Avatar": null,
        "DiscordNick": "Xerm",
        "Email": "psjoja@hotmail.com",
        "JoiningDate": "22-10-11"
      },
      posts: [],
      games: [
        {
          "GameId": 1,
          "GameName": "Path Of Exile",
          "NicknameIngame": "Xerm",
          "HoursPlayed": 5000,
          "Rank": "God",
          "Server": "EU",
          "Comments": "Best ARPG game at this moment!",
          "ProfileId": 1
        },
        {
          "GameId": 2,
          "GameName": "Teamfight Tactics",
          "NicknameIngame": "Pahaoja",
          "HoursPlayed": 654,
          "Rank": "Diamond",
          "Server": "EU-East",
          "Comments": "Best autobattler!",
          "ProfileId": 1
        },
        {
          "GameId": 3,
          "GameName": "Hades",
          "NicknameIngame": "Xerm",
          "HoursPlayed": 59,
          "Rank": "Godslayer",
          "Server": "Hell",
          "Comments": "This is awesome hack and slash game!",
          "ProfileId": 1
        },
        {
          "GameId": 5,
          "GameName": "Foxhole",
          "NicknameIngame": "Ahishi",
          "HoursPlayed": 91,
          "Rank": "SStg",
          "Server": "Alpha",
          "Comments": "Foxhole is a great game that just got an official release!",
          "ProfileId": 3
        },
        {
          "GameId": 10,
          "GameName": "Overwatch",
          "NicknameIngame": "Buildabudha",
          "HoursPlayed": 1122,
          "Rank": "SR3100",
          "Server": "Europe",
          "Comments": "Overwatch 2 gameplay is good.",
          "ProfileId": 3
        },
        {
          "GameId": 11,
          "GameName": "World of Warcraft",
          "NicknameIngame": "Loralyn",
          "HoursPlayed": 612,
          "Rank": "",
          "Server": "Hyjal",
          "Comments": "Horde",
          "ProfileId": 3
        },
        {
          "GameId": 12,
          "GameName": "Squad",
          "NicknameIngame": "ForegroundHatter",
          "HoursPlayed": 712,
          "Rank": "",
          "Server": "Just4Fun",
          "Comments": "pew pew goes the ppsh",
          "ProfileId": 3
        },
        {
          "GameId": 16,
          "GameName": "asd",
          "NicknameIngame": "ggg",
          "HoursPlayed": 5000,
          "Rank": "Supreme",
          "Server": "EU",
          "Comments": "",
          "ProfileId": 4
        },
        {
          "GameId": 21,
          "GameName": "Hades",
          "NicknameIngame": "Ahishimishi",
          "HoursPlayed": 1,
          "Rank": "",
          "Server": "",
          "Comments": "",
          "ProfileId": 3
        },
        {
          "GameId": 22,
          "GameName": "Scorn",
          "NicknameIngame": "scornklf",
          "HoursPlayed": 10,
          "Rank": "4",
          "Server": "UK",
          "Comments": "Scorn is an atmospheric first-person horror adventure game set in a nightmarish universe of odd forms and somber tapestry.",
          "ProfileId": 5
        }
      ],
    }
  },

  mounted () {
    axios
        .get('https://localhost:44372/api/Post')
        .then(response => (response.data.forEach( (currentPost) => {
          if(currentPost.PosterProfile == this.profile.ProfileId){
            console.log(' and ')
            this.posts.push(currentPost)
          }
        })))
        .catch()
  }
}
</script>