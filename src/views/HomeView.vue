<template>
  <div class="absolute font-bold ml-10 mb-10 border-b-4 border-gray-300 text-3xl w-[calc(100%-100px)]">
    <h1 class="bg-darkBackground pr-5 -mb-4 w-fit">Posts</h1>
  </div>
</template>

<script>

export default{
  name: 'HomeView',
  components: {},
  
  props: {
    states: Object,
    email: String,
  },

  mounted() {
    console.log(this.states)
  }
}
</script>
