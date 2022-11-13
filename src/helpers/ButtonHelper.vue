<template>
  <button
    class="rounded-full bg-primary py-2 px-5 w-fit text-white uppercase font-semibold subpixel-antialiased font-sm hover:drop-shadow-xl disabled:hover:drop-shadow-none disabled:text-gray-400 hover:bg-primaryDark transition duration-200"
    @click="$emit('buttonClick')"
    :id="name + '-button'"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  name: 'ButtonSubComponent',

  props: {
    name: String,
  },
}
</script>
