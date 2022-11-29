import { defineStore } from 'pinia'
import axios from 'axios'

interface State {}

export const useMeStore = defineStore('user', {
	state: (): State => {
		return {}
	},

	getters: {
		profileId(state) {
			// @ts-ignore
			return state.profileId
		},
	},

	actions: {
		async setMe() {
			axios
				.get('/api/Profile/@me')
				.then((response) => {
					this.$state = response.data
				})
				.catch((error) => {
					console.log(
						error +
							' : Getting @me profile was not successful! This may be intentional, if you are not logged in and the website tried to use a resource that it could not.'
					)
				})
		},
	},
})
