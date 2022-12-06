const fi = {
	nav: {
		feed: 'Syöte',
		about: 'Meistä'
	},
	main: {
		header: {
			title: 'Postaukset',
			description: 'Kaikenlaisia postauksia kaikenlaisilta käyttäjiltä.'
		}
	},
	buttons: {
		edit: 'Muokkaa',
		add: 'Lisää',
		new: 'Uusi',
		comment: 'Kommentoi',
		cancel: 'Peruuta',
		delete: 'Poista',
	},
	profile: {
		info: {
			deleteConfirmation: 'Oletko varma, että haluat poistaa käyttäjäsi pysyvästi?',
			profile: 'Profiili',
			nickname: 'Käyttäjänimi',
			firstname: 'Etunimi',
			lastname: 'Sukunimi',
			age: 'Ikä',
		},
		nav: {
			games: 'pelit',
			posts: 'postaukset',
			comments: 'kommentit'
		},
		headers: {
			yourPosts: {
				title: 'Sinun postauksesi',
				description: 'Kaikki sinun postaamasi postaukset'
			},
			yourComments: {
				title: 'Sinun kommenttisi',
				description: 'Kaikki sinun kommenttisi'
			},
			theirPosts: {
				title: '{nickname}:n postaukset',
				description: 'kaikki {nickname}n postaukset.'
			},
			theirComments: {
				title: '{nickname}:n kommentit',
				description: 'Kaikki {nickname}n kommentit'
			},
		}
	},
	game: {
		deleteConfirmation: 'Oletko varma, että haluat poistaa tämän pelin profiilistasi?',
		hours: 'tuntia',
		nickname: 'käyttäjä',
		hoursPlayed: 'tunteja pelattu',
		rank: 'rankki',
		server: 'palvelin',
		comment: 'kommentti',
		toCommunity: 'Mene yhteisöön',
		gameNamePlaceholder: 'Pelin nimi',
		gameCommentPlaceholder: 'Kirjoita kommenttisi pelistä tähän!'
	},
	comments: {
		deleteConfirmation: 'Oletko varma, että haluat poistaa tämän kommentin pysyvästi?',
		comment: 'Kommentti',
	},
	posts: {
		deleteConfirmation: 'Oletko varma, että haluat poistaa tämän postauksen pysyvästi?',
		placeholderTitle: 'Kirjoita postauksellesi otsikko',
		placeholderContent: 'Kirjoita hieman sisältöä postauksellesi',
		showComments: 'Näytä {numberOfComments} kommenttia',
		hideComments: 'Piilota kommentit',
		comments: 'Kommenttia'
	},
	about: {
		header: {
			title: 'Meistä',
			description: 'Sosiaalinen alusta pelaajille!'
		}
	},
	exceptions: {
		empty: {
			title: 'Vain tyhjää...',
			description: 'Näyttäisi siltä ettei täällä ole mitään nähtävää...'
		},
		notFound: {
			title: 'Hups!',
			description: 'Se mitä etsit ei kyllä ole täällä...'
		}

	},
	time: {
		second: '{amount} sekuntti sitten | {amount} sekunttia sitten',
		minute: '{amount} minuutti sitten | {amount} minuuttia sitten',
		hour: '{amount} tunti sitten | {amount} tuntia sitten',
		day: '{amount} päivä sitten | {amount} päivää sitten',
		month: '{amount} kuukausi sitten | {amount} kuukautta sitten',
		year: '{amount} vuosi sitten | {amount} vuotta sitten',
	},
	date: {
		joinDate: '{day}.{month}.{year}'
	}
}

export default fi
