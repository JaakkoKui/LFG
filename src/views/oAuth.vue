<template>
  <h2>Top kek</h2>
  <button @click="test">Test</button>
</template>

<script>
import router from "@/router";
import axios from "axios";
import url from 'url';

export default {
  name: "oAuth",
  
  methods: {
    test(){
      console.log(this.$route)
    }
  },
  
  mounted() {
    
    const url = "https://discord.com/api/v10/oauth2/token"

    const data = {
      'client_id': '1039545516142379139',
      'client_secret': 'YPJ1Fy31YCLtZ1QNNYir4l1GQYzISMw1',
      'grant_type': 'authorization_code',
      'code': this.$route.query.code,
      'redirect_uri': 'http://localhost:8080/auth/discord',
    }

    const config = {
      headers:{
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }
    };
    
    console.log(data);

    axios
        .post(url, data, config)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
  }
}
</script>