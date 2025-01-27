class PublicPage {
	AUTH = '/auth'

	HOME = '/'
	TRENDING = '/trending'
	GAME_VIDEOS = '/game-videos'

	MY_CHANNEL = '/my-channel'
	SUBSCRIPTIONS = '/subscriptions'
	HISTORY = '/history'
	LIKED_VIDEOS = '/liked-videos'

	FEEDBACK = '/feedback'

	VIDEO(path: string) {
		return `/v/${path}`
	}
	CHANNEL(path: string) {
		return `/c/${path}`
	}

	SEARCH(searchTerm: string) {
		return `/search?term=${searchTerm}`
	}
}

export const PAGE = new PublicPage()
