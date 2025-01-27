import { instance } from '@/api/axios'
import type { ISettingsData } from '@/types/settings.types'
import type { IFullUser } from '@/types/user.types'

class UserService {
	private _USERS = '/users'

	async getProfile() {
		const { data } = await instance.get<IFullUser>(`${this._USERS}/profile`)
		return data
	}
	async updateProfile(settings: ISettingsData) {
		const { data } = await instance.put<boolean>(`${this._USERS}/profile`, settings)
		return data
	}
}

export const userService = new UserService()
