<template>
	<div class="w-full mb-4 relative h-full">
		<!-- Game title -->
		<div
			id="gameName"
			class="text-4xl font-bold p-8 text-center bg-secondary text-text-white rounded-xl mt-2 mx-2"
		>
			<input
				v-model="gameDto.gameName"
				class="w-full bg-transparent px-1 outline-0 font-bold border-b-2 border-text-darker focus:border-white placeholder:text-text-darker text-center"
				:placeholder="$t('game.gameNamePlaceholder')"
				id="gameName"
			/>
		</div>

		<!-- Game content body -->
		<div class="flex my-4 p-8 lg:px-16 lg:py-8">
			<div class="font-bold capitalize w-full flex flex-col gap-y-2">
				<h4 class="my-auto">{{ $t('game.nickname') }}</h4>
				<h4 class="my-auto">{{ $t('game.hoursPlayed') }}</h4>
				<h4 class="my-auto">{{ $t('game.rank') }}</h4>
				<h4 class="my-auto">{{ $t('game.server') }}</h4>
			</div>
			<div class="flex flex-col gap-y-2 w-fit">
				<input v-model="gameDto.nicknameInGame" class="w-full rounded-full bg-accent px-1 text-center" id="nickname"
							 maxlength="20"/>
				<input
					v-model="gameDto.hoursPlayed"
					type="number"
					class="w-full rounded-full bg-accent px-1 text-center"
					id="hoursPlayed"
					min="0"
					max="999999"
				/>
				<input v-model="gameDto.rank" class="w-full rounded-full bg-accent px-1 text-center" id="rank" maxlength="20"/>
				<input v-model="gameDto.server" class="w-full rounded-full bg-accent px-1 text-center" id="server"
							 maxlength="20"/>
			</div>
		</div>

		<!-- Game comment -->
		<div class="px-8 lg:px-16">
			<h4 class="font-bold capitalize">{{ $t('game.comment') }}</h4>
			<textarea
				v-model="gameDto.comments"
				:placeholder="$t('game.gameCommentPlaceholder')"
				class="bg-background-darker placeholder:text-text-darker outline-0 resize-none overflow-hidden w-full border-b border-background-lighter focus:border-white mt-1"
				rows="1"
				@input="autoGrow"
				id="comments"
				maxlength="500"
			></textarea>
		</div>

		<Toast v-if="faulty" :text="$t('exceptions.faultyGame')" @close="this.faulty = false"/>

		<!-- New game controls -->
		<div class="flex absolute right-0 bottom-0 mx-8">
			<CancelButtonHelper @click="cancelNew"/>
			<ButtonHelper name="Add" @click="postNewGame" ref="addGame"/>
		</div>
	</div>
</template>

<script>
import CancelButtonHelper from '@/helpers/CancelButtonHelper.vue'
import ButtonHelper from '@/helpers/ButtonHelper.vue'
import axios from 'axios'
import router from '@/router'
import Toast from "@/components/exceptions/Toast.vue";

export default {
	name: 'NewGameContentComponent',
	components: {
	Toast,
		CancelButtonHelper,
		ButtonHelper,
	},

	//Data stores the Data Transfer Object that is sent when new game is ready
	data() {
		return {
			faulty: false,

			gameDto: {
				gameName: '',
				nicknameInGame: '',
				hoursPlayed: null,
				rank: '',
				server: '',
				comments: '',
			},
		}
	},

	methods: {
		//Cancel the new comment and reroute back to profile
		cancelNew() {
			router.push('/profile/' + this.$route.params.profileId)
		},

		//Post new game to database
		async postNewGame() {
			if (this.gameDto.gameName.length > 0 && this.gameDto.nicknameInGame.length > 0 && this.gameDto.hoursPlayed < 1000000) {
				axios
					.post('/api/Game', this.gameDto)
					.then(() => {
						router.push('/profile/' + this.$route.params.profileId)
					})
					.catch()
			} else {
				this.faulty = true
			}
		},

		//Autogrow comment when space runs out
		autoGrow() {
			let element = document.getElementById('comments')
			element.style.height = '5px'
			element.style.height = element.scrollHeight + 4 + 'px'
		},
	},
}
</script>
