import type { IChannel } from './channel.types'
import type { IPagination } from './pagination.types'
import type { EnumVideoPlayerQuality } from './video-player.types'

export interface IVideo {
	id: string
	publicId: string
	title: string
	description: string
	thumbnailUrl: string
	videoFileName: string
	maxResolution: EnumVideoPlayerQuality
	viewsCount: number
	isPublic: boolean
	channel: IChannel
	createdAt: string
}

export interface IFullVideo extends IVideo {
	likes: []
}
export interface IApiResponseVideos extends IFullVideo {
	videos: IVideo[]
}

export interface ISingleVideoResponse extends IFullVideo {
	similarVideos: IVideo[]
}

export interface IVideosPagination extends IPagination {
	videos: IVideo[]
}
