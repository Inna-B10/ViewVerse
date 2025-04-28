import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from '@/constants/constants'
import { type ErrorResponse, errorCatch } from './api.helper'
import { authService } from '@/services/auth.service'
import { EnumTokens } from '@/types/auth.types'

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

//for public request
export const axiosClassic = axios.create(options)

//for request where needed Authorization
export const instance = axios.create(options)

//get a token and bind it to a request
instance.interceptors.request.use(config => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error as ErrorResponse) === 'jwt expired' ||
				errorCatch(error as ErrorResponse) === 'jwt must be provided') &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (
					errorCatch(error as ErrorResponse) === 'jwt expired' ||
					errorCatch(error as ErrorResponse) === 'Refresh token not passed'
				) {
					authService.removeTokenFromStorage()
					throw error
				}
			}
		}
		throw error
	}
)
