import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { EnumTokens } from '@/types/auth.types'
import type { IUser } from '@/types/user.types'

interface IAuthState {
	user: IUser | null
	isLoggedIn: boolean
	accessToken: string | null
	authReady: boolean
}

const initialState: IAuthState = {
	user: null,
	isLoggedIn: !!Cookies.get(EnumTokens.ACCESS_TOKEN),
	accessToken: Cookies.get(EnumTokens.ACCESS_TOKEN) || null,
	authReady: false
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthData(
			state,
			action: PayloadAction<{
				user: IUser
				accessToken: string
			}>
		) {
			state.user = action.payload.user
			state.isLoggedIn = true
			state.accessToken = action.payload.accessToken
		},
		setAuthReady(state, action: PayloadAction<boolean>) {
			state.authReady = action.payload
		},
		clearAuthData(state) {
			state.user = null
			state.isLoggedIn = false
			state.accessToken = null
		}
	}
})

export const { setAuthData, setAuthReady, clearAuthData } = authSlice.actions
