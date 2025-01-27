import type { IChannel } from './channel.types'
import type { IFullUser } from './user.types'

//NB Pick uses if we need only some fields, not all data
//NB channel separately because again only some fields, else we could write Pick<IFullUser, 'name' | 'channel' | 'email'>
export interface ISettingsData extends Pick<IFullUser, 'name' | 'email'> {
	channel?: Pick<IChannel, 'avatarUrl' | 'bannerUrl' | 'description' | 'slug'>
}
