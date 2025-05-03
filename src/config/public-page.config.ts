class PublicPage {
	AUTH = '/auth'

	HOME = '/'
	TRENDING = '/trending'
	GAME_VIDEOS = '/game-videos'

	LIKED_VIDEOS = '/liked-videos'
	SUBSCRIPTIONS = '/subscriptions'
	MY_CHANNEL = '/my-channel'
	HISTORY = '/history'

	FEEDBACK = '/feedback'

	VIDEO(path: string) {
		return `/video/${path}`
	}
	CHANNEL(path: string) {
		return `/channel/${path}`
	}

	SEARCH(searchTerm: string) {
		return `/search?term=${searchTerm}`
	}
}

export const PAGE = new PublicPage()
