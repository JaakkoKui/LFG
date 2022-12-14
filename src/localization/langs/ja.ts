const ja = {
	nav: {
		feed: '入力',
		about: '約'
	},
	main: {
		header: {
			title: '投稿',
			description: 'あらゆる種類のユーザーからのあらゆる種類の投稿'
		}
	},
	buttons: {
		edit: '編集',
		add: '追加',
		new: '新着',
		comment: 'コメント',
		cancel: 'キャンセル',
		delete: '消去',
		close: '近い',
	},
	profile: {
		info: {
			deleteConfirmation: 'プロファイルを完全に削除してもよろしいですか?',
			profile: 'プロフィール',
			nickname: 'ニックネーム',
			firstname: 'ファーストネーム',
			lastname: '苗字',
			age: '年',
		},
		nav: {
			games: 'ゲーム',
			posts: '投稿',
			comments: 'コメント'
		},
		headers: {
			yourPosts: {
				title: 'あなたの投稿',
				description: 'あなたが投稿したすべての投稿。'
			},
			yourComments: {
				title: 'あなたのコメント',
				description: 'あなたがコメントしたすべてのコメント。'
			},
			theirPosts: {
				title: '{nickname}さんの投稿',
				description: '{nickname} のすべての投稿。'
			},
			theirComments: {
				title: '{nickname} さんのコメント',
				description: '{nickname} のすべてのコメント'
			},
		}
	},
	game: {
		deleteConfirmation: 'このゲームをプロフィールから削除してもよろしいですか?',
		hours: '時間',
		nickname: 'ニックネーム',
		hoursPlayed: 'プレイ時間',
		rank: 'ランク',
		server: 'サーバ',
		comment: 'コメント',
		toCommunity: 'コミュニティに行く',
		gameNamePlaceholder: 'ゲーム名',
		gameCommentPlaceholder: 'ここにコメントを書いてください！'
	},
	comments: {
		deleteConfirmation: 'このコメントを完全に削除してもよろしいですか?',
		comment: 'コメント',
	},
	posts: {
		deleteConfirmation: 'この投稿を完全に削除してもよろしいですか?',
		placeholderTitle: '投稿のタイトルを書く',
		placeholderContent: '投稿内容に何かを書く',
		showComments: '{numberOfComments} 件のコメントを表示',
		hideComments: 'コメントを非表示',
		comments: 'コメント'
	},
	about: {
		header: {
			title: '私たちに関しては',
			description: 'ゲーマーのためのソーシャルプラットフォーム！'
		},
		vision: {
			title: '空想',
			content: 'アイデアは、ゲーマーがビデオゲームを通じて他のゲーマーとつながり、競争し、見つけることができるソーシャルプラットフォームを持つことです.',
		},
		features: {
			title: '当社の特徴！',
			subtitle: '私たちのアプリでは、次のことができます',
			content: {
				l1: 'ログインすると、Discord のユーザーからプロフィールが作成されます。 そこから、最初のロケール、discord、および最初のプロファイル名を取得します。',
				l2: 'あなた自身のプロフィールを作成して使用し、他のユーザーにニックネームを付けて、あなたの年齢と名前であなたを呼び、必要に応じて他のユーザーに電話をかけます。',
				l3: 'それらのゲームにゲームと統計を追加します。',
				l4: '「フィード」と呼ばれる共通のページにあなたの考えを投稿してください。',
				l5: '好き、嫌い、またはコメントで議論することで、投稿に反応します。',
				l6: '上記を編集または削除します。',
				l7: '他の人のプロフィールとゲームを表示します。'
			}
		},
		future: {
			title: '未来？',
			subtitle: '将来的には、',
			content: {
				l1: 'ゲームごとに専用のコミュニティがあります。',
				l2: 'ゲームを選択するスマートな方法があります。',
				l3: 'ユーザーが私たちのプラットフォームでお互いに友達になる方法を用意してください。',
				l4: '他のユーザーをスマートに検索できます。',
				l5: 'e スポーツ組織などのカスタム コミュニティを作成します。',
			}
		}
	},
	exceptions: {
		empty: {
			title: 'そんな空...',
			description: 'ここには何もないように見えます...'
		},
		notFound: {
			title: 'おっとっと！',
			description: 'あなたが探しているものはここにないようです...'
		},
		faultyGame: 'ゲーム情報が無効です',
		age: 'ありえない年齢'
	},
	time: {
		second: '{amount} 秒前 | {amount} 秒前',
		minute: '{amount} 分前 | {amount} 分前',
		hour: '{amount} 時間前 | {amount} 時間前',
		day: '{amount} 日前 | {amount} 日前',
		month: '{amount} か月前 | {amount} か月前',
		year: '{amount} 年前 | {amount} 年前',
	},
	date: {
		joinDate: '{year}年{month}月{day}日'
	}
}

export default ja
