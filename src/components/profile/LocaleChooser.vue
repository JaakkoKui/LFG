<template>
	<!-- Locale menu -->
	<section
					 class="flex flex-col rounded-xl bg-background-default p-2 max-sm:justify-center sm:my-2 overflow-y-auto z-10 max-sm:mb-2">
		<button v-for="locale in locales" :id="locale.lang" @click="handleLocaleChange(locale)"
						class="py-2 px-4 text-center border-b border-background-lighter transition duration-100 hover:text-text-white hover:scale-105">
			{{ locale.language }}
		</button>
	</section>
</template>

<script>
import {useMeStore} from "@/stores/me";
import axios from "axios";

export default {
	name: "LocaleChooser",

  //Setup pinia for getting your profile data to edit
  setup() {
		const meStore = useMeStore()
		return {meStore}
  },

	data() {
		return {
			locales: [
				{language: 'Suomi', lang: 'fi'},
				{language: 'English', lang: 'en'},
				{language: '日本語', lang: 'ja'},
			],
			profile: {}
		}
	},

	methods: {
	  //Change locale locally or if logged in change the profiles locale
			handleLocaleChange(locale){
				this.profile = this.meStore.$state
				if(this.profile.profileId !== null){
					this.changeLocale(locale.lang)
				} else {
		  		this.$i18n.locale = locale.lang
				}
			},

			changeLocale(lang){
			  axios
					.put('/api/Profile/setLocale/' + lang)
					.then(() => {
						this.$i18n.locale = lang
					})
					.catch((error) => {
					  console.log(error)
					})
			}
	}
}
</script>
