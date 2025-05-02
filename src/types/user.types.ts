import type { IChannel } from './channel.types'
import type { IWatchHistory } from './history.types'
import type { IFullVideo, IVideo } from './video.types'

export interface IUser {
	id: string
	name?: string
	email: string
}

export interface IFullUser extends IUser {
	channel?: IChannel
	subscriptions: IChannel[]
	watchHistory: IWatchHistory[]
	verificationToken?: string | null
}

export interface IVideoLiked {
	id: string
	video: IFullVideo
	userId: string
}

export interface IProfileResponse extends IFullUser {
	likes: IVideoLiked[]
	subscribedVideos?: IVideo[]
}
