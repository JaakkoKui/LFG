<template>
  <div class="h-[calc(100vh-65px)] w-screen overflow-clip">
    <div class="flex h-full">
      <div class="basis-2/3 bg-darkBackground relative">
        
        <div class="">
          <div class="absolute h-[700px] w-[700px] rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 rotate-45 -right-[220px] -top-[366px] z-10">
            <div class="absolute h-[670px] w-[670px] bg-darkBackground">

            </div>
          </div>
          <div class="absolute h-[1100px] w-[1100px] rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 opacity-50 rotate-45 -right-[420px] -top-[566px]">
            <div class="absolute h-[1070px] w-[1070px] bg-darkBackground">

            </div>
          </div>
          <div class="absolute h-[1000px] w-[1100px] rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-50 -rotate-45 -left-[734px] -bottom-1/4 z-10">
            <div class="absolute h-[970px] w-[1070px] bg-darkBackground">

            </div>
          </div>
          <div class="absolute h-[1100px] w-[1100px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50 -rotate-45 -left-[550px] -bottom-1/4 ">
            <div class="absolute h-[1070px] w-[1070px] bg-darkBackground">

            </div>
          </div>
        </div>
        
      </div>
      
      <div class="basis-1/3 flex flex-col justify-center bg-white shadow-lg z-10 overflow-y-auto">
        <!-- Login -->
        <div v-if="isLogging" class="w-full text-gray-600">
          <img class="mx-auto h-[200px] -mt-[240px] mb-[20px] object-contain" :src="require(`@/assets/images/Logo.png`)" alt="logo">
          <div class="h-[300px] w-3/5 m-auto">
            <div class="font-semibold subpixel-antialiased uppercase">login</div>
            <form id="login" class="h-full flex flex-col relative pt-2 pb-8">
              <label class="mt-4">
                E-mail
                <input name="email" id="email" placeholder="Email" class="w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1" type="email" v-model="loginInfo.email">
              </label>
              <label class="mt-4">
                Password
                <input name="password" id="password" placeholder="Password" class="w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1" type="password" v-model="loginInfo.password">
              </label>
              <ButtonSubComponent type="button" class="w-full mt-6 mb-9 disabled:!bg-gray-300" name="login" :disabled="loginInfo.password.length === 0 || loginInfo.email.length === 0" @buttonClick="handleLoginButton"/>
              <div class="text-sm absolute bottom-0 w-full">
                <p class="p-1.5 bg-white border-solid border border-gray-300 w-fit rounded-full mx-auto">OR</p>
              </div>
              <hr class="border-gray-300">
            </form>
          </div>
        </div>

        <!-- Register -->
        <div v-if="!isLogging" class="w-full text-gray-600 w-3/5 mx-auto">
          <div class="font-semibold subpixel-antialiased uppercase">register</div>
          <form id="login" class="h-full flex flex-col relative pt-2 pb-8">
            <label class="mt-4">
              E-mail
              <input name="email" id="email" placeholder="Email" class="w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1" type="email" v-model="registerInfo.email">
            </label>
            <label class="mt-4">
              Password
              <input name="password" id="password" placeholder="Password" class="w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1" type="password" v-model="registerInfo.password">
            </label>
            <label class="mt-4">
              Confirm password
              <input name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" class="w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1" type="password" v-model="registerInfo.confirmPassword">
            </label>
            <label class="mt-4">
              Username
              <input name="username" id="username" placeholder="Username" class="w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1" type="text" v-model="postProfile.nickname">
            </label>
            
            <fieldset class="ring-2 ring-gray-300 ring-inset px-4 pb-4 mt-4 -mx-4 rounded-md flex flex-col">
              <legend class="bg-white">Optional</legend>
              
              <div class="flex">
                <label class="mt-4 mr-2">
                  First name
                  <input name="firstname" id="firstname" placeholder="First name" class="w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1" type="text" v-model="postProfile.firstName">
                </label>
                <label class="mt-4 ml-2">
                  Last name
                  <input name="lastname" id="lastname" placeholder="Last name" class="w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1" type="text" v-model="postProfile.lastName">
                </label>
              </div>

              <label class="mt-4">
                Age
                <input name="age" id="age" placeholder="Age" class="w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1" type="number" v-model="postProfile.age">
              </label>
              
              <label class="mt-4">
                Discord nick
                <input name="username" id="username" placeholder="Username" class="w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1" type="text" v-model="loginInfo.email">
              </label>
            </fieldset>
            
            
            <ButtonSubComponent type="button" class="w-full mt-6 mb-9 disabled:!bg-gray-300" name="register" @buttonClick="register" :disabled="registerInfo.confirmPassword.length === 0 || registerInfo.password.length === 0 || registerInfo.email.length === 0 || postProfile.nickname.length === 0"/>
            <div class="text-sm w-full border-b border-gray-300">
              <p class="p-1.5 bg-white border-solid border border-gray-300 w-fit rounded-full mx-auto -mb-4">OR</p>
            </div>
          </form>
        </div>
        
        
        
        <button v-if="isLogging" class="py-3 px-6 mt-6 w-fit text-center mx-auto block uppercase font-semibold subpixel-antialiased font-sm text-gray-500 hover:text-gray-900" @click="isLogging = false"> Register </button>
        <button v-if="!isLogging" class="py-3 px-6 w-fit text-center mx-auto block uppercase font-semibold subpixel-antialiased font-sm text-gray-500 hover:text-gray-900" @click="isLogging = true"> Login </button>
      </div>
    </div>
    
  </div>
</template>

<script>
import ButtonSubComponent from "@/components/subcomponents/ButtonSubComponent";
import axios from "axios";
export default {
  name: "LoginView",
  components: {ButtonSubComponent},
  
  data() {
    return {
      isLogging: false,
      loginInfo: {
        email: "",
        password: "",
      },
      
      registerInfo: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      
      postProfile: {
        email: "",
        nickname: "",
        firstName: "",
        lastName: "",
        age: null,
        avatar: null,
        discordNick: "",
        joiningDate: ""
      }
    }
  },
  
  methods: {
    
    register(){
      if(this.registerInfo.email !== "" && this.registerInfo.password !== "" && this.registerInfo.confirmPassword !== ""){
        axios
            .post("https://localhost:44372/api/Auth/SignUp", this.registerInfo)
            .then()
            .catch()
        
        this.postProfile.email = this.registerInfo.email
        if(this.postProfile.age === null){
          this.postProfile.age = 0
        }
        
        const today = new Date()
        this.postProfile.joiningDate =  today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        
        axios
            .post("https://localhost:44372/api/Profile", this.postProfile)
            .then(response => this.isLogging = true)
            .catch()
      }
      
    },
    
    handleLoginButton(){
      axios
          .post("https://localhost:44372/api/Auth/SignIn", this.loginInfo)
          .then(response => this.$emit("login", response.data, this.loginInfo.email))
          .catch()
    }
  }
}
</script>