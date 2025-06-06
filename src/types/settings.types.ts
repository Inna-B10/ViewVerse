import type { IChannel } from './channel.types'
import type { IFullUser } from './user.types'

//NB Pick uses if we need only some fields, not all data
//NB channel separately because again only some fields, else we could write Pick<IFullUser, 'name' | 'channel' | 'email'>
export interface IUserSettingsData extends Pick<IFullUser, 'name' | 'email' | 'avatar_url'> {
	password?: string
}
export interface IChannelSettingsData {
	// extends Pick<IFullUser, 'name' | 'email'>
	channel?: Pick<IChannel, 'bannerUrl' | 'description'>
	slug?: Pick<IChannel, 'slug'>
}
