const en = {
	nav: {
		feed: 'Feed',
		about: 'About'
	},
	main: {
		header: {
			title: 'Posts',
			description: 'All kinds of posts from all kinds of users'
		}
	},
	buttons: {
		edit: 'Edit',
		add: 'Add',
		new: 'New',
		comment: 'Comment',
		cancel: 'Cancel',
		delete: 'Delete',
		close: 'Close'
	},
	profile: {
		info: {
			deleteConfirmation: 'Are you sure you want to delete your profile permanently?',
			profile: 'Profile',
			nickname: 'Nickname',
			firstname: 'Firstname',
			lastname: 'Lastname',
			age: 'Age',
		},
		nav: {
			games: 'Games',
			posts: 'Posts',
			comments: 'Comments'
		},
		headers: {
			yourPosts: {
				title: 'Your posts',
				description: 'All posts posted by you.'
			},
			yourComments: {
				title: 'Your comments',
				description: 'All comments commented by you.'
			},
			theirPosts: {
				title: '{nickname}s posts',
				description: 'All {nickname}s posts.'
			},
			theirComments: {
				title: '{nickname}s comments',
				description: 'All {nickname}s comments'
			},
		}
	},
	game: {
		deleteConfirmation: 'Are you sure you want to delete this game from your profile?',
		hours: 'hours',
		nickname: 'nickname',
		hoursPlayed: 'hours played',
		rank: 'rank',
		server: 'server',
		comment: 'comment',
		toCommunity: 'Go to the community',
		gameNamePlaceholder: 'Game Name',
		gameCommentPlaceholder: 'Write your comment here!'
	},
	comments: {
		deleteConfirmation: 'Are you sure you want to delete this comment permanently?',
		comment: 'Comment',
	},
	posts: {
		deleteConfirmation: 'Are you sure you want to delete this post permanently?',
		placeholderTitle: 'Write a title for your post',
		placeholderContent: 'Write something for your post content',
		showComments: 'Show {numberOfComments} comments',
		hideComments: 'Hide comments',
		comments: 'Comments'
	},
	about: {
		header: {
			title: 'About us',
			description: 'Social platform for gamers!'
		},
		vision: {
			title: 'Vision.',
			content: 'The idea is to have a social platform where gamers can bond, compete and find other gamers through video games.',
		},
		features: {
			title: 'Our features!',
			subtitle: 'On our app you can',
			content: {
				l1: 'On login your profile is created from your user on Discord. From there we get your initial locale, discord and your initial profile name.',
				l2: 'Make and use your very own profile and giving others a Nickname to call you by and optionally for other users your age and name.',
				l3: 'Add games and statistics in those games.',
				l4: 'Post your thoughts to a common page we call "feed".',
				l5: 'React to posts by either liking, disliking or discussing by comments.',
				l6: 'Edit or delete the above-mentioned.',
				l7: 'View other people\'s profiles and games within.'
			}
		},
		future: {
			title: 'Future?',
			subtitle: 'In the future we would like to',
			content: {
				l1: 'Have dedicated communities for each game.',
				l2: 'Have a smart way of selecting games.',
				l3: 'Have a way for users to befriend each other on our platform.',
				l4: 'Have a smart way to search other users.',
				l5: 'Have custom communities for example for e-sports organizations.',
			}
		}
	},
	exceptions: {
		empty: {
			title: 'Such empty...',
			description: 'It would look like there is nothing here...'
		},
		notFound: {
			title: 'Oops!',
			description: 'What you are looking for does not appear to be here...'
		},
		faultyGame: 'Faulty game info...',
		age: 'Impossibe age...'
	},
	time: {
		second: '{amount} second ago | {amount} seconds ago',
		minute: '{amount} minute ago | {amount} minutes ago',
		hour: '{amount} hour ago | {amount} hours ago',
		day: '{amount} day ago | {amount} days ago',
		month: '{amount} month ago | {amount} months ago',
		year: '{amount} year ago | {amount} years ago',
	},
	date: {
		joinDate: '{month}/{day}/{year}'
	}
}

export default en
