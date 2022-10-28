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
        <div class="w-full text-gray-600">
          <img class="mx-auto h-[200px] -mt-[240px] mb-[20px] object-contain" :src="require(`@/assets/images/Logo.png`)" alt="logo">
          <div class="h-[300px] w-3/5 m-auto">
            <div class="font-semibold subpixel-antialiased">LOGIN</div>
            <form id="login" class="h-full flex flex-col relative pt-2 pb-8">
              <label class="mt-4">
                E-mail
                <input name="email" id="email" placeholder="Email" class="w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1" type="email" v-model="loginInfo.email">
              </label>
              <label class="mt-4">
                Password
                <input name="password" id="password" placeholder="Password" class="w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1" type="password" v-model="loginInfo.password">
              </label>
              <ButtonSubComponent type="button" class="w-full mt-6 mb-9" name="login" :disabled="loginInfo.password.length === 0 || loginInfo.email.length === 0" @buttonClick="handleLoginButton"/>
              <div class="text-sm absolute bottom-0 w-full">
                <p class="p-1.5 bg-white border-solid border border-gray-300 w-fit rounded-full mx-auto">OR</p>
              </div>
              <hr class="border-gray-300">
            </form>
          </div>
        </div>
        <button class="py-3 px-6 mt-6 w-fit text-center mx-auto block uppercase font-semibold subpixel-antialiased font-sm text-gray-500 hover:text-gray-900"> Register </button>
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
      loginInfo: {
        email: "",
        password: "",
      },
    }
  },
  
  methods: {
    handleLoginButton(){
      axios
          .post("https://localhost:44372/api/Auth/SignIn", this.loginInfo)
          .then(response => this.$emit("login", response.data, this.loginInfo.email))
          .catch()
    }
  }
}
</script>