<template>
  <div
      v-if="isTheProfileOwner && !isAddingNewPost"
      class="text-base -mb-5 ml-auto bg-darkBackground z-10 px-5"
  >
    <ButtonSubComponent
        class="-mr-10"
        name="New Post"
        @buttonClick="isAddingNewPost = true"
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
          <AvatarComponent/>
        </div>

        <!-- Post body -->
        <div class="w-[calc(100%-200px)]">
          <!-- Post header -->
          <div class="flex h-[50px]">
            <router-link
                v-if="profile"
                :to="'/profile/' + profile.nickname"
                class="text-md font-bold hover:text-white"
            >{{ profile.nickname }} (You)
            </router-link
            >
          </div>

          <!-- Post content -->
          <div class="mb-5">
            <h1 class="break-words text-xl font-bold mb-2">
              <input
                  v-model="postInfo.title"
                  class="-ml-2 rounded-lg bg-lightBackground text-white px-2 w-[400px]"
                  maxlength="50"
                  placeholder="Title"
              />
            </h1>
            <textarea
                v-model="postInfo.content"
                class="-ml-2 rounded-lg bg-lightBackground text-white px-2 w-full"
                maxlength="512"
                placeholder="Content"
                rows="5"
            />
          </div>
        </div>
      </div>

      <div class="w-fit ml-auto flex mr-[120px]">
        <button
            class="font-semibold py-2 px-5 w-fit uppercase"
            @click="cancelNewPost"
        >
          Cancel
        </button>
        <ButtonSubComponent
            :disabled="!postInfo.title || !postInfo.content"
            class="disabled:bg-lightBackground transition ease-in-out duration-300"
            name="Post"
            @buttonClick="postNewPost"
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
