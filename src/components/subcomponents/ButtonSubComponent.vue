<template>
  <button class="rounded-full bg-primary py-2 px-5 w-fit text-white uppercase font-semibold subpixel-antialiased font-sm hover:drop-shadow-xl disabled:hover:drop-shadow-none disabled:bg-gray-200 disabled:text-gray-400" @click="$emit('buttonClick')" :id="name + '-button'">{{ name }}</button>
</template>

<script>
export default {
  name: "ButtonSubComponent",
  
  props: {
    name: String,
  }
}
</script>