import { axiosClassic, instance } from '@/api/axios'
import type { IChannel } from '@/types/channel.types'

class ChannelService {
	private _CHANNELS = '/channels'

	/* ---------------------------- Get All Channels ---------------------------- */
	getAll() {
		const data = axiosClassic.get<IChannel[]>(this._CHANNELS)
		return data
	}

	/* ------------------------------- Get By Slug ------------------------------ */
	bySlug(slug?: string | null) {
		const data = axiosClassic.get<IChannel>(`${this._CHANNELS}/by-slug/${slug}`)
		return data
	}

	/* -------------------------- (un)Subscribe Channel ------------------------- */
	toggleSubscribe(channelSlug: string) {
		return instance.patch(`${this._CHANNELS}/toggle-subscribe/${channelSlug}`)
	}
}

export const channelService = new ChannelService()
