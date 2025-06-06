import { instance } from '@/api/axios'
import type { IUserSettingsData } from '@/types/settings.types'
import type { IProfileResponse } from '@/types/user.types'

class UserService {
	private _USERS = '/users'

	/* ------------------------------- GetProfile ------------------------------- */
	async getProfile() {
		const { data } = await instance.get<IProfileResponse>(`${this._USERS}/profile`)
		console.log('profile: ', data)
		return data
	}

	/* ------------------------------ UpdateUserSettings ----------------------------- */
	async updateProfile(settings: IUserSettingsData) {
		// console.log('settings: ', settings)
		const { data } = await instance.put<boolean>(`${this._USERS}/profile`, settings)
		return data
	}
	/* ------------------------------ UpdateChannelSettings ----------------------------- */
	// 	async updateChannel(settings: IChannelSettingsData) {
	// 		console.log('settings: ', settings)
	//
	// 		const { data } = await instance.put<boolean>(`${this._USERS}/profile`, settings)
	// 		console.log('data: ', data)
	// 		return data
	// 	}

	/* ------------------------------- ToggleLike ------------------------------- */
	async toggleLike(videoId: string) {
		const { data } = await instance.put(`${this._USERS}/profile/likes`, { videoId })
		return data
	}
}

export const userService = new UserService()
