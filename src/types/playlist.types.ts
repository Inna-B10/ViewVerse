import type { ISingleVideoResponse } from './video.types'

export interface IPlaylist {
	id: string
	title: string
	videos: ISingleVideoResponse[]
	userId: string
	createdAt: string
}

export interface IPlaylistData {
	title: string
	videoPublicId: string
}
