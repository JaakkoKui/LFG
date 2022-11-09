<template>
  <img class="aspect-square object-contain rounded-full bg-primary" :alt="nickname" src="@/assets/images/DefaultAvatars/Xermos.png">
</template>

<script>
export default {
name: "AvatarComponent",
  
  props: {
    avatar: String,
    nickname: String,
  }
}
</script>

<style scoped>

</style>