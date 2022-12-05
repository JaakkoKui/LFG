<template>
	<div class="w-full mb-4 relative h-full">
		<div
			id="game"
			class="text-4xl font-bold p-8 text-center bg-gradient-to-r from-secondary to-secondaryVariant text-text-white rounded-xl mt-2 mx-2"
		>
			<input
				v-model="gameDto.gameName"
				class="w-full bg-transparent px-1 outline-0 font-bold border-b-2 border-text-darker focus:border-white placeholder:text-text-darker text-center"
				:placeholder="game.gameName"
				id="gameName"
			/>
		</div>
		<div class="flex my-4 p-8 lg:px-16 lg:py-8">
			<div class="font-bold capitalize w-full flex flex-col gap-y-2">
				<h4 class="my-auto">{{$t('game.nickname')}}</h4>
				<h4 class="my-auto">{{$t('game.hoursPlayed')}}</h4>
				<h4 class="my-auto">{{$t('game.rank')}}</h4>
				<h4 class="my-auto">{{$t('game.server')}}</h4>
			</div>
			<div class="flex flex-col gap-y-2 w-fit">
				<input
					v-model="gameDto.nicknameInGame"
					:placeholder="game.nicknameInGame"
					class="w-full rounded-full bg-accent px-1 text-center"
					id="nickname"
				/>
				<input
					v-model="gameDto.hoursPlayed"
					:placeholder="game.hoursPlayed"
					type="number"
					class="w-full rounded-full bg-accent px-1 text-center"
					id="hoursPlayed"
				/>
				<input
					v-model="gameDto.rank"
					:placeholder="game.rank"
					class="w-full rounded-full bg-accent px-1 text-center"
					id="rank"
				/>
				<input
					v-model="gameDto.server"
					:placeholder="game.server"
					class="w-full rounded-full bg-accent px-1 text-center"
					id="server"
				/>
			</div>
		</div>

		<div class="px-8 lg:px-16">
			<h4 class="font-bold capitalize">{{$t('game.comment')}}</h4>
			<textarea
				v-model="gameDto.comments"
				:placeholder="game.comments"
				class="bg-background-darker placeholder:text-text-darker outline-0 resize-none overflow-hidden w-full border-b border-background-lighter focus:border-white mt-1"
				rows="1"
				@input="autoGrow"
				id="comments"
			></textarea>
		</div>

		<div class="flex absolute right-0 bottom-0 mx-8">
			<CancelButtonHelper @click="cancelEdit" ref="cancelButton"/>
			<ButtonHelper :name="$t('buttons.edit')" @click="editGame" ref="editButton"/>
		</div>
	</div>
</template>

<script>
import CancelButtonHelper from '../../helpers/CancelButtonHelper.vue'
import ButtonHelper from '../../helpers/ButtonHelper.vue'
import axios from 'axios'

export default {
	name: 'EditGameContentComponent',
	components: {
		CancelButtonHelper,
		ButtonHelper,
	},

	props: {
		game: Object,
	},

	data() {
		return {
			faulty: false,

			gameDto: {},
		}
	},

	methods: {
		cancelEdit() {
			this.$emit('cancel')
		},

		editGame() {
			if (this.gameDto.gameName.length > 0 && this.gameDto.nicknameInGame.length > 0) {
				axios
					.put('/api/Game/' + this.game.gameId, this.gameDto)
					.then(() => {
						this.$emit('updateGame')
						this.cancelEdit()
					})
					.catch()
			} else {
				this.faulty = true
			}
		},

		autoGrow() {
			let element = document.getElementById('comments')
			element.style.height = '5px'
			element.style.height = element.scrollHeight + 4 + 'px'
		},
	},

	mounted() {
		let gameCopy = Object.assign({}, this.game)

		this.gameDto = {
			gameName: gameCopy.gameName,
			nicknameInGame: gameCopy.nicknameInGame,
			hoursPlayed: gameCopy.hoursPlayed,
			rank: gameCopy.rank,
			server: gameCopy.server,
			comments: gameCopy.comments,
		}

		this.autoGrow()
	},
}
</script>
