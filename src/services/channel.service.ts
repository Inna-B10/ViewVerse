import axios from 'axios'
import { axiosClassic, instance } from '@/api/axios'
import type { IChannel } from '@/types/channel.types'
import type { IChannelSettingsData } from '@/types/settings.types'

class ChannelService {
	private _CHANNELS = '/channels'

	/* ---------------------------- Get All Channels ---------------------------- */
	getAll() {
		const data = axiosClassic.get<IChannel[]>(this._CHANNELS)
		return data
	}

	/* ------------------------------- Get By Slug ------------------------------ */
	async bySlug(slug?: string | null): Promise<IChannel | null> {
		try {
			const response = await axiosClassic.get<IChannel>(`${this._CHANNELS}/by-slug/${slug}`)
			return response.data
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 404) {
					return null
				}
			}

			console.error('Error getting channel:', error)
			throw error
		}
	}

	/* -------------------------- (un)Subscribe Channel ------------------------- */
	toggleSubscribe(channelSlug: string) {
		return instance.patch(`${this._CHANNELS}/toggle-subscribe/${channelSlug}`)
	}

	/* ------------------------------ UpdateChannelSettings ----------------------------- */
	async updateChannel(settings: IChannelSettingsData) {
		console.log('settings: ', settings)
		try {
			const { data } = await instance.put<boolean>(`${this._CHANNELS}/channel-settings`, settings)
			return data
		} catch (error: any) {
			console.error('API ERROR: ', error?.response?.data || error)
			throw error
		}
	}
}

export const channelService = new ChannelService()
