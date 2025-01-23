class PublicPage {
	//online
	// HOME = '.'

	//local
	HOME = ''
	AUTH = `${this.HOME}/auth`
	TRENDING = `${this.HOME}/trending`
	GAME_VIDEOS = `${this.HOME}/game-videos`
	// GAME_VIDEOS = '/gameplay'

	MY_CHANNEL = `${this.HOME}/my-channel`
	SUBSCRIPTIONS = `${this.HOME}/subscriptions`
	HISTORY = `${this.HOME}/history`
	LIKED_VIDEOS = `${this.HOME}/liked-videos`

	FEEDBACK = `${this.HOME}/feedback`

	VIDEO(path: string) {
		return `/v/${path}`
	}
	CHANNEL(path: string) {
		return `/c/${path}`
	}

	SEARCH(searchTerm: string) {
		return `${this.HOME}/search?term=${searchTerm}`
	}
}

export const PAGE = new PublicPage()
