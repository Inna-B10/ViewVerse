import { axiosClassic } from '@/api/axios'
import type { IChannel } from '@/types/channel.types'

class ChannelService {
	private _CHANNELS = '/channels'

	async bySlug(slug?: string | null) {
		const { data } = await axiosClassic.get<IChannel>(`${this._CHANNELS}/by-slug/${slug}`)
		return data
	}
}

export const channelService = new ChannelService()
