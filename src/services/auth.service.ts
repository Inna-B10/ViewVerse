import Cookies from 'js-cookie'
import { clearAuthData, setAuthData } from '@/store/auth.slice'
import { axiosClassic } from '@/api/axios'
import { store } from '@/store'
import type { IAuthData } from '@/types/auth-form.types'
import { EnumTokens } from '@/types/auth.types'
import type { IUser } from '@/types/user.types'

interface IAuthResponse {
	user: IUser
	accessToken: string
}

class AuthService {
	private _AUTH = './auth'

	async main(type: 'login' | 'register', data: IAuthData, recaptchaToken?: string | null) {
		const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/${type}`, data, {
			headers: { recaptcha: recaptchaToken }
		})

		if (response.data.accessToken) {
			this._saveTokenStorage(response.data.accessToken) //save token in cookies
			store.dispatch(setAuthData(response.data)) // save user's data to our global store
		}
		return response
	}

	/* -------------------------- GetNewTokens (Client) ------------------------- */
	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/access-token`)

		if (response.data.accessToken) {
			this._saveTokenStorage(response.data.accessToken)
			store.dispatch(setAuthData(response.data))
		}
		return response
	}

	/* --------------------- GetNewTokensByRefresh (Server) --------------------- */
	async getNewTokensByRefresh(refreshToken: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this._AUTH}/access-token`,
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`
				}
			}
		)
		return response.data
	}

	/* --------------------------------- Logout -------------------------------- */
	async logout() {
		const response = await axiosClassic.post<boolean>(`${this._AUTH}/logout`)

		if (response.data) {
			this._removeTokenStorage()
			store.dispatch(clearAuthData()) // remove user's data from global store
		}

		return response
	}

	/* ------------------------------- Save Token ------------------------------- */
	//[!] change domain for production
	private _saveTokenStorage(accessToken: string) {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			domain: 'localhost',
			sameSite: 'strict',
			expires: 1
		})
	}

	/* ------------------------------ Remove Token ------------------------------ */
	private _removeTokenStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN)
	}
}

export const authService = new AuthService()
