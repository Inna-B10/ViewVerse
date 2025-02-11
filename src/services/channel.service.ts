import { axiosClassic } from '@/api/axios'
import type { IChannel } from '@/types/channel.types'

class ChannelService {
	private _CHANNELS = '/channels'

	/* --------------------------------- Get All -------------------------------- */
	getAll() {
		const data = axiosClassic.get<IChannel[]>(this._CHANNELS)
		return data
	}

	/* ------------------------------- Get By Slug ------------------------------ */
	bySlug(slug?: string | null) {
		const data = axiosClassic.get<IChannel>(`${this._CHANNELS}/by-slug/${slug}`)
		return data
	}
}

export const channelService = new ChannelService()
