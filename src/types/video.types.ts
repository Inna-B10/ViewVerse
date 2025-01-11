import type { IChannel } from './channel.types'

export interface IVideo {
	id: string
	title: string
	publicId: string
	description: string
	thumbnailUrl: string
	videoFileName: string
	viewsCount: number
	isPublic: boolean
	channel: IChannel
	createdAt: string
}
export interface IApiResponseVideos {
	videos: IVideo[]
}
