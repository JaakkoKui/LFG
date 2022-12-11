import {createApp} from 'vue'
import { createI18n } from 'vue-i18n'
import {createPinia} from 'pinia'
import messages from "@/localization/localization";

import App from './App.vue'
import router from './router'

import './style.css'

//i18n options
const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages,
})

createApp(App)
	.use(createPinia())
	.use(router)
	.use(i18n)
	.mount('#app')
