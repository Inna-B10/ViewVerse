class StudioPage {
	STUDIO_HOME = '/studio'

	SETTINGS = `${this.STUDIO_HOME}/settings`

	UPLOAD_VIDEO = `${this.STUDIO_HOME}/upload`

	EDIT_VIDEO(path: string) {
		return `/edit/v/${path}`
	}
	//? EDIT_CHANNEL(path: string) {
	// 	return `/edit/c/${path}`
	// }
}

export const STUDIO_PAGE = new StudioPage()
