<template>
  <!-- Profile header -->
  <ProfileInfoComponent v-if="profile" :profile="profile" />

  <!-- Games container -->

  <!-- Posts container -->
  <div
    class="absolute flex font-bold ml-10 mt-10 border-b-4 border-gray-300 text-3xl w-[calc(100%-100px)]"
  >
    <h1 class="bg-darkBackground pr-5 -mb-4 w-fit">Posts</h1>
  </div>

  <!-- Posts -->
</template>

<script>
import axios from 'axios'
import ProfileInfoComponent from '@/components/profile/ProfileInfoComponent.vue'

export default {
  name: 'ProfileView',
  components: {
    ProfileInfoComponent
  },

  data() {
    return {
      profile: {}
    }
  },

  methods: {
    getProfile(id) {
      if (id) {
        axios
          .get('https://localhost:5001/api/Profile/' + id)
          .then((response) => {
            this.profile = response.data[0]
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  },

  mounted() {
    this.getProfile(this.$route.params.profileId)
  }
}
</script>
