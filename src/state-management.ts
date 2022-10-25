import {reactive} from "vue";
import axios from "axios";

export const rootStates = reactive({

    posts: [],
    profiles: [],
    comments: [],
    games: [],

    host : 'https://localhost:44372/api',

    getPosts() {
        axios
            .get(this.host + '/Post')
            .then(response => (this.posts = response.data))
            .catch()
    },
    
    getComments() {
        axios
            .get(this.host + '/Comment')
            .then(response => (this.comments = response.data))
            .catch()
    },

    getProfiles() {
        axios
            .get(this.host + '/Profile')
            .then(response => (this.profiles = response.data))
            .catch()
    },

    getGames() {
        axios
            .get(this.host + '/Game')
            .then(response => (this.games = response.data))
            .catch()
    },
})