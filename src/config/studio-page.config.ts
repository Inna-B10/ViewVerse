class StudioPage {
	//online
	// HOME = './studio'

	//local
	HOME = '/studio'

	SETTINGS = `${this.HOME}/settings`

	UPLOAD_VIDEO = `${this.HOME}/upload`

	EDIT_VIDEO(path: string) {
		return `/edit/v/${path}`
	}
	EDIT_CHANNEL(path: string) {
		return `/edit/c/${path}`
	}
}

export const STUDIO_PAGE = new StudioPage()
