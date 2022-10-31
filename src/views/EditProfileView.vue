<template>
  <div v-if="isTheProfileOwner" class="min-h-[calc(100vh-65px)] w-screen bg-darkBackground text-gray-300">
    <form class="w-fit mx-auto p-10">
      <div class="flex-col flex gap-y-3 w-[420px]">
        <label>
          <p class="mb-1 font-semibold">Nickname</p> 
          <input id="username" name="username" class="rounded-md px-2 py-1 bg-lightBackground w-[420px]" placeholder="Nickname" v-model="profileUpdateData.Nickname">
        </label>
        <div class="flex gap-x-[20px]">
          <label>
            <p class="mb-1 font-semibold">First name</p> 
            <input id="firstname" name="firstname" class="rounded-md px-2 py-1 bg-lightBackground w-[200px]" placeholder="First name" v-model="profileUpdateData.FirstName">
          </label>
          <label>
            <p class="mb-1 font-semibold">Last name</p> 
            <input id="lastname" name="lastname" class="rounded-md px-2 py-1 bg-lightBackground w-[200px]" placeholder="Last name" v-model="profileUpdateData.LastName">
          </label>
        </div>
        <label>
          <p class="mb-1 font-semibold">Age</p> 
          <input id="age" name="age" type="number" class="rounded-md px-2 py-1 bg-lightBackground w-[420px]" v-model="profileUpdateData.Age">
        </label>
        <label>
          <p class="mb-1 font-semibold">Discord Nick</p>
          <input id="discord" name="discord" class="rounded-md px-2 py-1 bg-lightBackground w-[420px]" placeholder="Discord nick" v-model="profileUpdateData.DiscordNick">
        </label>
        <ButtonSubComponent class="ml-auto mt-3 mb-5" @buttonClick="updateProfile" name="Update Profile" type="button"/>
      </div>
      <hr class="w-full border-gray-600 w-full ml-auto">
      <div class="flex-col flex gap-y-3 mt-5 w-[420px]">
        <label>
          <p class="mb-1 font-semibold">Current Password</p> 
          <input type="password" id="currentPassword" name="currentPassword" class="rounded-md px-2 py-1 bg-lightBackground w-[420px]" placeholder="Current password">
          </label>
        <label>
          <p class="mb-1 mt-5 font-semibold">New Password</p> 
          <input type="password" id="password" name="password" class="rounded-md px-2 py-1 bg-lightBackground w-[420px]" placeholder="New password">
        </label>
        <ButtonSubComponent class="ml-auto mt-3 mb-5" name="Set Password" type="button"/>
      </div>
      <hr class="w-full border-gray-600 w-full ml-auto">
      <div class="flex justify-right">
        <ButtonSubComponent class="ml-auto !bg-red-500 hover:!bg-red-700 mt-3 mb-5" @buttonClick="deleteProfile" name="Delete Profile" type="button"/>
      </div>
    </form>
  </div>
  <div v-else class="text-center w-full my-20">
    <h1 class="text-7xl font-bold">='(</h1>
    <h4 class="text-4xl font-bold w-full mt-10">Something went wrong...</h4>
  </div>
</template>

<script>
import ButtonSubComponent from "@/components/subcomponents/ButtonSubComponent";
import axios from "axios";
import router from "@/router";
export default {
  name: "EditProfileView",
  components: {ButtonSubComponent},
  
  props: {
    email: String,
    states: [],
  },
  
  data(){
    return {
      profileUpdateData: {}
    }
  },

  computed: {
    profile(){
      return this.states.profiles.find(profile => profile.Nickname === this.$route.params.userNick)
    },

    isTheProfileOwner(){
      return this.profile.Email === this.email
    }
  },
  
  methods: {
    updateProfile(){
      axios
          .put("https://localhost:44372/api/Profile", this.profileUpdateData)
          .then(response => (router.push('/profile/' + this.profileUpdateData.Nickname)))
          .catch()
    },
    
    deleteProfile(){
      axios.
          delete("https://localhost:44372/api/Profile", this.profile.ProfileId)
    },
  },
  
  mounted(){
    this.profileUpdateData = this.profile
  },
}
</script>