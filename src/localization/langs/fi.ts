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
		close: 'Sulje'
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
		},
		vision: {
			title: 'Visio.',
			content: 'Ideamme on olla sosiaalinen alusta pelaajille, jotta he voivat löytää toisia pelaajia heidän pelaamiensa videopelien kautta.'
		},
		features: {
			title: 'Palvelumme ominaisuuksia!',
			subtitle: 'Palvelussamme tällä hetkellä voit',
			content: {
				l1: 'On login your profile is created from your user on Discord. From there we get your initial locale, discord and your initial profile name.',
				l2: 'Make and use your very own profile and giving others a Nickname to call you by and optionally for other users your age and name.',
				l3: 'Add games and statistics in those games.',
				l4: 'Post your thoughts to a common page we call "feed".',
				l5: 'React to posts by either liking, disliking or discussing by comments.',
				l6: 'Edit or delete the above mentioned.',
				l7: 'View other people\'s profiles and games within.'
			}
		},
		future: {
			title: 'Tulevaisuudessa?',
			subtitle: 'Tulevaisuudessa haluaisimme toteuttaa',
			content: {
				l1: 'Jokaiselle pelille oman yhteisön.',
				l2: 'Paremman tavan lisätä pelejä profiilille.',
				l3: 'Antaa käyttäjille mahdollisuus pyytää muita käyttäjiä kavereiksi alustalla.',
				l4: 'Hyvän tavan löytää muita käyttäjiä hakemalla käyttäjän nimellä.',
				l5: 'Muokattavia yhteisön päivittämiä yhteisöjä esim. e-sports tapahtumia varten.',
			}
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
		},
		faultyGame: 'Vialliset pelin tiedot...',
		age: 'Mahdoton ikä...'

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
