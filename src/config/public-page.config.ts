class PublicPage {
	AUTH = '/auth'

	HOME = '/'
	TRENDING = '/trending'
	GAME_VIDEOS = '/game-videos'

	LIKED_VIDEOS = '/user/liked-videos'
	SUBSCRIPTIONS = '/user/subscriptions'
	MY_CHANNEL = '/my-channel'
	HISTORY = '/user/history'

	FEEDBACK = '/feedback'

	VIDEO(path: string) {
		return `/video/${path}`
	}
	CHANNEL(path: string) {
		return `/channel/${path}`
	}
	PLAYLISTS(path?: string) {
		return `/user/playlists${path ? `/${path}` : ''}`
	}

	SEARCH(searchTerm: string) {
		return `/search?term=${searchTerm}`
	}
}

export const PAGE = new PublicPage()
