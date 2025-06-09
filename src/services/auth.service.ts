import Cookies from 'js-cookie'
import { clearAuthData, setAuthData, setAuthReady } from '@/store/auth.slice'
import { axiosClassic, instance } from '@/api/axios'
import { userService } from './studio/user.service'
import { store } from '@/store'
import type { IAuthData } from '@/types/auth-form.types'
import { EnumTokens } from '@/types/auth.types'
import type { IUser } from '@/types/user.types'

interface IAuthResponse {
	user: IUser
	accessToken: string
}

class AuthService {
	private _AUTH = '/auth'

	async main(type: 'login' | 'register', data: IAuthData, recaptchaToken?: string | null) {
		const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/${type}`, data, {
			headers: { recaptcha: recaptchaToken }
		})

		if (response.data.accessToken) {
			this._saveTokenToStorage(response.data.accessToken) //save token in cookies
			store.dispatch(setAuthData(response.data)) // save user's data to our global store
		}
		return response
	}

	// async getUserProfile() {
	// 	const response = await axiosClassic.get<IUser>('/auth/profile')
	// 	store.dispatch(
	// 		setAuthData({ user: response.data, accessToken: Cookies.get(EnumTokens.ACCESS_TOKEN) || '' })
	// 	)
	// }

	/* ----------------------------- InitializeAuth / Re-login----------------------------- */
	//in cases when an accessToken (client) expired, try to get new using refreshToken (server), if unsuccessfully - clear all user data from store and all cookies

	async initializeAuth() {
		const initialStore = store.getState().auth
		if (initialStore.user) return

		const hasAccessToken = !!Cookies.get(EnumTokens.ACCESS_TOKEN)
		const hasRefreshToken = !!Cookies.get('refreshToken')

		try {
			if (hasAccessToken) {
				const profile = await userService.getProfile() // try to get user from accessToken
				store.dispatch(
					setAuthData({
						user: profile,
						accessToken: Cookies.get(EnumTokens.ACCESS_TOKEN) || ''
					})
				)
			} else if (hasRefreshToken) {
				await this.getNewTokens() // try to get new tokens
			} else {
				store.dispatch(clearAuthData()) // guest - without errors
			}
		} catch (error: unknown) {
			if (process.env.NODE_ENV === 'development') {
				console.warn('Unexpected error in getNewTokens:', error)
			}

			store.dispatch(clearAuthData()) //delete user's data from global store
		} finally {
			store.dispatch(setAuthReady(true)) // always call even if there is an error
		}
	}

	/* -------------------------- GetNewTokens (Client cookie) ------------------------- */
	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/access-token`)

		if (response.data.accessToken) {
			this._saveTokenToStorage(response.data.accessToken)
			store.dispatch(setAuthData(response.data))
		}
		store.dispatch(setAuthReady(true))
		return response
	}

	/* --------------------------------- Logout -------------------------------- */
	async logout() {
		const response = await axiosClassic.post<boolean>(`${this._AUTH}/logout`)

		if (response.data) {
			this.removeTokenFromStorage()
		}
		return response
	}

	/* ------------------------------- Save Token ------------------------------- */
	//[!] change domain for production
	private _saveTokenToStorage(accessToken: string) {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			domain: 'localhost',
			sameSite: 'strict',
			expires: 1 / 24, //1h
			secure: true
		})
	}

	/* ------------------------------ Remove Token ------------------------------ */
	removeTokenFromStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN)
		store.dispatch(clearAuthData())
	}

	/* --------------------------- Verification Email --------------------------- */
	async resendVerificationEmail() {
		return await instance.post(`${this._AUTH}/resend-verification`)
	}
}

export const authService = new AuthService()
