import { instance } from '@/api/axios'
import type { IFullUser } from '@/types/user.types'

class UserService {
	private _USERS = '/users'

	async getProfile() {
		const { data } = await instance.get<IFullUser>(`${this._USERS}/profile`)
		return data
	}
}

export const userService = new UserService()
