<template>
  <div
    v-if="isTheProfileOwner && !isAddingNewPost"
    class="text-base -mb-5 ml-auto bg-darkBackground z-10 px-5"
  >
    <ButtonSubComponent
      class="-mr-10"
      @buttonClick="isAddingNewPost = true"
      name="New Post"
    />
  </div>
  <div class="pt-10">
    <div
      v-if="isTheProfileOwner && isAddingNewPost"
      class="px-10 pt-[60px] -mb-10 z-10"
    >
      <div class="flex w-full">
        <!-- Poster Avatar -->
        <div class="mx-5 w-[50px]">
          <AvatarComponent />
        </div>

        <!-- Post body -->
        <div class="w-[calc(100%-200px)]">
          <!-- Post header -->
          <div class="flex h-[50px]">
            <router-link
              v-if="profile"
              class="text-md font-bold hover:text-white"
              :to="'/profile/' + profile.nickname"
            >{{ profile.nickname }} (You)</router-link
            >
          </div>

          <!-- Post content -->
          <div class="mb-5">
            <h1 class="break-words text-xl font-bold mb-2">
              <input
                class="-ml-2 rounded-lg bg-lightBackground text-white px-2 w-[400px]"
                v-model="postInfo.title"
                placeholder="Title"
                maxlength="50"
              />
            </h1>
            <textarea
              class="-ml-2 rounded-lg bg-lightBackground text-white px-2 w-full"
              v-model="postInfo.content"
              placeholder="Content"
              maxlength="512"
              rows="5"
            />
          </div>
        </div>
      </div>

      <div class="w-fit ml-auto flex mr-[120px]">
        <button
          @click="cancelNewPost"
          class="font-semibold py-2 px-5 w-fit uppercase"
        >
          Cancel
        </button>
        <ButtonSubComponent
          class="disabled:bg-lightBackground transition ease-in-out duration-300"
          :disabled="!postInfo.title || !postInfo.content"
          @buttonClick="postNewPost"
          name="Post"
        />
      </div>
    </div>
</template>

<script>
export default {
  name: 'NewPostComponent'
}
</script>

<style scoped>

</style>