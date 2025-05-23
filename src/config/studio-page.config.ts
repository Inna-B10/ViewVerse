class StudioPage {
	STUDIO_HOME = '/studio'

	SETTINGS = `${this.STUDIO_HOME}/settings`

	UPLOAD_VIDEO = `${this.STUDIO_HOME}/upload`

	EDIT_VIDEO(path: string) {
		return `${this.STUDIO_HOME}/edit/v/${path}`
	}
}

export const STUDIO_PAGE = new StudioPage()
