<template>
	<article class="w-full mb-4 relative h-full">
		<!-- game title-->
		<div
			id="game"
			class="text-4xl font-bold p-8 text-center bg-secondary text-text-white rounded-xl mt-2 mx-2"
		>
			<input
				v-model="gameDto.gameName"
				class="w-full bg-transparent px-1 outline-0 font-bold border-b-2 border-text-darker focus:border-white placeholder:text-text-darker text-center"
				:placeholder="game.gameName"
				id="gameName"
			/>
		</div>
		<!-- Game info block -->
		<div class="flex my-4 p-8 lg:px-16 lg:py-8">
			<!-- Stat legends -->
			<div class="font-bold capitalize w-full flex flex-col gap-y-2">
				<h4 class="my-auto">{{ $t('game.nickname') }}</h4>
				<h4 class="my-auto">{{ $t('game.hoursPlayed') }}</h4>
				<h4 class="my-auto">{{ $t('game.rank') }}</h4>
				<h4 class="my-auto">{{ $t('game.server') }}</h4>
			</div>

			<!-- Stat input fields -->
			<div class="flex flex-col gap-y-2 w-fit">
				<input
					v-model="gameDto.nicknameInGame"
					:placeholder="game.nicknameInGame"
					class="w-full rounded-full bg-accent px-1 text-center"
					id="nickname"
					maxlength="20"
				/>
				<input
					v-model="gameDto.hoursPlayed"
					:placeholder="game.hoursPlayed"
					type="number"
					class="w-full rounded-full bg-accent px-1 text-center"
					id="hoursPlayed"
		  		min="0"
					max="999999"
				/>
				<input
					v-model="gameDto.rank"
					:placeholder="game.rank"
					class="w-full rounded-full bg-accent px-1 text-center"
					id="rank"
		  		maxlength="20"
				/>
				<input
					v-model="gameDto.server"
					:placeholder="game.server"
					class="w-full rounded-full bg-accent px-1 text-center"
					id="server"
		  		maxlength="20"
				/>
			</div>
		</div>

		<!-- Comment textfield -->
		<div class="px-8 lg:px-16">
			<h4 class="font-bold capitalize">{{ $t('game.comment') }}</h4>
			<textarea
				v-model="gameDto.comments"
				:placeholder="game.comments"
				class="bg-background-darker placeholder:text-text-darker outline-0 resize-none overflow-hidden w-full border-b border-background-lighter focus:border-white mt-1"
				rows="1"
				@input="autoGrow"
				id="comments"
				maxlength="500"
			></textarea>
		</div>

		<Toast v-if="faulty" :text="$t('exceptions.faultyGame')" @close="this.faulty = false"/>

		<!-- Game edit controls -->
		<div class="flex absolute right-0 bottom-0 mx-8">
			<CancelButtonHelper @click="cancelEdit" ref="cancelButton"/>
			<ButtonHelper :name="$t('buttons.edit')" @click="editGame" ref="editButton"/>
		</div>
	</article>
</template>

<script>
import CancelButtonHelper from '../../helpers/CancelButtonHelper.vue'
import ButtonHelper from '../../helpers/ButtonHelper.vue'
import axios from 'axios'
import Toast from "@/components/exceptions/Toast.vue";

export default {
	name: 'EditGameContentComponent',
	components: {
	Toast,
		CancelButtonHelper,
		ButtonHelper,
	},

	//Props from parent, previous game object
	props: {
		game: Object,
	},

	//Keep track is game is valid and store game Data Transfer Object for sending
	data() {
		return {
			faulty: false,
			gameDto: {},
		}
	},

	methods: {
		//Cancel game edit and emit that to parent
		async cancelEdit() {
			this.$emit('cancel')
		},

		//Update if valid game with the known DTO
		async editGame() {
			if (this.gameDto.gameName.length > 0 && this.gameDto.nicknameInGame.length > 0 && this.gameDto.hoursPlayed < 1000000) {
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

		//Fit a prototype of the unedited game to the editable game DTO
		async buildGameDto(gameCopy) {
			this.gameDto = {
				gameName: gameCopy.gameName,
				nicknameInGame: gameCopy.nicknameInGame,
				hoursPlayed: gameCopy.hoursPlayed,
				rank: gameCopy.rank,
				server: gameCopy.server,
				comments: gameCopy.comments,
			}
		},

		//Grow comment field if runs out of space
		autoGrow() {
			let element = document.getElementById('comments')
			element.style.height = '5px'
			element.style.height = element.scrollHeight + 4 + 'px'
		},
	},


	//On created prototype a deep copy of previous game and fit it to the game DTO.
	created() {
		let gameCopy = Object.assign({}, this.game)
		this.buildGameDto(gameCopy)
	},

	//Autogrow on mounted
	mounted(){
		this.autoGrow()
	}
}
</script>
