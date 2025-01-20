import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from '@/constants/constants'
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
